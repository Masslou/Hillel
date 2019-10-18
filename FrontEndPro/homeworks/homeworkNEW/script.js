'use strict';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const ACTIVE_CLASS = 'active';
const DELETE_BUTTON_CLASS = 'delete-user-btn';

const usersListTemplate = document.getElementById('users-template').innerHTML;
const userInformationTemplate = document.getElementById('user-information-template').innerHTML;
const usersList = document.getElementById('users-list-container');
const userInformation = document.getElementById('user-information-container');

usersList.addEventListener('click', onUsersListClick);
userInformation.addEventListener('click', onUsersInfoClick);
// const displayAddUserFormBtn = document.querySelector('.form-btn');


fetch(USERS_URL).then((resp) => {
    resp.json().then((data) => {
        renderUsersList(data);
        return data;
    }).then((data) => {
        getUserInformation(data[0].id);
        addActiveClass(usersList.firstElementChild);
    }).catch(error => console.log(error))
});


function renderUsersList(list) {
    const usersHTML = list.map(element => {
        return usersListTemplate.replace('{{username}}', element.username).replace('{{id}}', element.id)
    });
    usersList.innerHTML = usersHTML.join('\n');
}


function renderUserInformation(data) {
    const userInformationHTML = userInformationTemplate.replace('{{username}}', data.username)
        .replace('{{name}}', data.name)
        .replace('{{email}}', data.email)
        .replace('{{street}}', data.address.street)
        .replace('{{suite}}', data.address.suite)
        .replace('{{city}}', data.address.city)
        .replace('{{zipcode}}', data.address.zipcode)
        .replace('{{phone}}', data.phone)
        .replace('{{website}}', data.website)
        .replace('{{name}}', data.company.name)
        .replace('{{catchPhrase}}', data.company.catchPhrase)
        .replace('{{bs}}', data.company.bs)
        .replace('{{id}}', data.id);

    userInformation.innerHTML = userInformationHTML;
}


function getUserInformation(id) {
    fetch(`${USERS_URL}/${id}`).then((resp) => {
        resp.json().then((data) => {
            renderUserInformation(data)
        }).catch(error => console.log(error))
    });
}


function onUsersInfoClick() {
    const userId = document.querySelector(`.${ACTIVE_CLASS}`).dataset.userId;
    deleteUser(userId);
}

function onUsersListClick(event) {
    const element = event.target;
    const userID = element.dataset.userId;


    if (element.classList.contains('user-item-name')) {
        toggleClass(element);
        getUserInformation(userID);
    }
}


function toggleClass(element) {
    removeActiveClass();
    addActiveClass(element);
}


function removeActiveClass() {
    const taggedUser = document.querySelector(`.${ACTIVE_CLASS}`);
    taggedUser.classList.remove(ACTIVE_CLASS);
}

function addActiveClass(element) {
    element.classList.add(ACTIVE_CLASS);
}


function deleteUser(userId) {
    fetch(`${USERS_URL}/${userId}`, {
        method: 'DELETE',
    });

    document.querySelector(`[data-user-id='${userId}']`).parentElement;
    let getUserFromList = usersList.querySelector(`[data-user-id='${userId}']`);
    getUserFromList.parentNode.removeChild(getUserFromList);
    addActiveClass(usersList.firstElementChild);
    getUserInformation(usersList.firstElementChild.dataset.userId);
}




