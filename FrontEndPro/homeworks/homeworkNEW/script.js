'use strict';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const ACTIVE_CLASS = 'active';

const user_list_item = 'user-item-name';
const delete_user_btn = 'delete-user-btn';
const usersListTemplate = document.getElementById('users-template').innerHTML;
const userInformationTemplate = document.getElementById('user-information-template').innerHTML;
const newUserFormTemplate = document.getElementById('new-user-template').innerHTML;
const userInformation = document.getElementById('user-information-container');
const addButton = document.querySelector('.add-user-btn');
const usersList = document.getElementById('users-list-container');


intiApp();

function intiApp() {
    bindListeners();
}

function onAddUserClick() {
    renderAddNewUserForm();
}

function bindListeners() {
    usersList.addEventListener('click', onUsersListClick);
    userInformation.addEventListener('click', onUserInformation);
    addButton.addEventListener('click', onAddUserClick);
}

fetch(USERS_URL)
    .then((resp) => {
        resp.json()
            .then((data) => {
                renderUsersList(data);
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

function addUserInList(name, id) {
    const userHTML = usersListTemplate.replace('{{username}}', name)
        .replace('{{id}}', id);

    usersList.innerHTMLL += userHTML;
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

function renderAddNewUserForm() {
    userInformation.innerHTML = newUserFormTemplate;
}


function getUserInformation(id) {
    fetch(`${USERS_URL}/${id}`).then((resp) => {
        resp.json().then((data) => {
            renderUserInformation(data)
        }).catch(error => console.log(error))
    });
}


function onUserInformation(event) {
    if (event.target.classList.contains(delete_user_btn)) {
        const userId = document.querySelector(`.${ACTIVE_CLASS}`).dataset.userId;
        deleteUser(userId);
    }

    if (event.target.classList.contains('new-user-submit')) {
        event.preventDefault();
        addNewUser();
    }
}

function onUsersListClick(event) {
    const element = event.target;
    const userID = element.dataset.userId;


    if (element.classList.contains(user_list_item)) {
        toggleClass(element);
        getUserInformation(userID);
    }
}


function toggleClass(element) {
    removeActiveClass();
    addActiveClass(element);
}

function getInputValue(id) {
    return document.getElementById(`${id}`).value;
}

function addNewUser() {
    const getNewUserId = document.querySelectorAll(`.${user_list_item}`).length + 1;


    let newUserInformation = {
        id: getNewUserId,
        name: getInputValue('name'),
        username: getInputValue('username'),
        email: getInputValue('email'),

        address: {
            street: getInputValue('street'),
            suite: getInputValue('suite'),
            city: getInputValue('city'),
            zipcode: getInputValue('zip'),
        },

        phone: getInputValue('phone'),
        website: getInputValue('website'),

        company: {
            name: getInputValue('company-name'),
            catchPhrase: getInputValue('catch-phrase'),
            bs: getInputValue('bs')
        }
    };

    fetch(USERS_URL, {
        method: 'POST',
        body: JSON.stringify(newUserInformation)
    }).then(() => {
        addUserInList(newUserInformation.username, newUserInformation.id);
    });
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
    const getUserFromList = usersList.querySelector(`[data-user-id='${userId}']`);
    getUserFromList.parentNode.removeChild(getUserFromList);
    addActiveClass(usersList.firstElementChild);
    getUserInformation(usersList.firstElementChild.dataset.userId);
}




