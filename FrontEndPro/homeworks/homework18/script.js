'use strict';

const usersURL = 'https://jsonplaceholder.typicode.com/users/';

const userList = document.querySelector('.user-list');
const userDetails = document.querySelector('.user-details');

const userListItemTemplate = document.getElementById('user-list-item-template').innerHTML;
const userDetailsTemplate = document.getElementById('user-details-template').innerHTML;

const userDetailsFormTemplate = document.getElementById('user-details-form-template').innerHTML;


const displayAddUserFormBtn = document.querySelector('.display-form-btn');

displayAddUserFormBtn.addEventListener('click', displayForm);
userList.addEventListener('click', userListEvent);
userDetails.addEventListener('click', userDetailsEvent);


function userDetailsEvent(e) {

    switch (true) {
        case e.target.classList.contains('delete-user-btn'):
            const targetUserID = e.target.parentNode.querySelector('.user-details-id-value').innerHTML;
            deleteUser(targetUserID);

            if (userList.firstElementChild == null) {
                userDetails.innerHTML = '';
            } else {
                const newFirstUserList = userList.firstElementChild.dataset.id;
                fetchUserDetails(newFirstUserList);
            }

            break;

        case e.target.classList.contains('save-new-user-btn'):
            addNewUser();
            break;
    }
}


function deleteUser(userId) {
    fetch(usersURL + userId, {
        method: 'DELETE',
    })

    let getUserFromList = userList.querySelector(`[data-id='${userId}']`);
    getUserFromList.parentNode.removeChild(getUserFromList);

}

function displayForm() {
    return userDetails.innerHTML = userDetailsFormTemplate;
}

function getInputValue(className) {
    return document.querySelector(`${className}`).value
}

function addNewUser() {
    const getNewId = document.querySelectorAll('.user-list-item').length + 1;


    let newUserData = {
        id: getNewId,
        name: getInputValue('.user-details-name-input'),
        username: getInputValue('.user-details-username-input'),
        email: getInputValue('.user-details-email-input'),

        address: {
            street: getInputValue('.user-details-address__street-input'),
            suite: getInputValue('.user-details-address__suite-input'),
            city: getInputValue('.user-details-address__city-input'),
            zipcode: getInputValue('.user-details-address__zipcode-input'),
        },

        phone: getInputValue('.user-details-phone-input'),
        website: getInputValue('.user-details-website-input'),

        company: {
            name: getInputValue('.user-details-company-name-input'),
            catchPhrase: getInputValue('.user-details-company-catchPhrase-input'),
            bs: getInputValue('.user-details-company-bs-input')
        }
    }

    fetch(usersURL, {
        method: 'POST',
        body: JSON.stringify(newUserData)
    }).then((data) => {
        return userList.innerHTML += addUserToList(newUserData);
    });
}


fetch(usersURL)
    .then(response => response.json())
    .then(json => {
        renderUserListItems(json);
        fetchUserDetails(json[0].id);
    })
    .catch(error => {
        console.error('Error loading');
    });

function addUserToList(elem) {
    return userListItemTemplate.replace('{{id}}', elem.id)
        .replace('{{name}}', elem.name)
        .replace('{{username}}', elem.username);
}


function renderUserListItems(list) {
    const usersHtml = list.map(elem => {
        return addUserToList(elem);
    })

    return userList.innerHTML = usersHtml.join('');
}

function renderUserDetails(el) {
    const userDetailsHtml = userDetailsTemplate.replace('{{id}}', el.id)
        .replace('{{name}}', el.name)
        .replace('{{username}}', el.username)
        .replace('{{email}}', el.email)
        .replace('{{street}}', el.address.street)
        .replace('{{suite}}', el.address.suite)
        .replace('{{city}}', el.address.city)
        .replace('{{zipcode}}', el.address.zipcode)
        .replace('{{phone}}', el.phone)
        .replace('{{website}}', el.website)
        .replace('{{name}}', el.company.name)
        .replace('{{catchPhrase}}', el.company.catchPhrase)
        .replace('{{bs}}', el.company.bs);

    return userDetails.innerHTML = userDetailsHtml;
}

function fetchUserDetails(userID) {
    fetch(usersURL + userID)
        .then(response => response.json())
        .then(json => {
            renderUserDetails(json);
        })
        .catch(error =>{
            userDetails.innerHTML =  '';
        });
}

function userListEvent(e) {
    const targetUserID = e.target.dataset.id;

    switch (true) {
        case e.target.classList.contains('user-list-item'):
            fetchUserDetails(targetUserID);
            break;
    }
}
