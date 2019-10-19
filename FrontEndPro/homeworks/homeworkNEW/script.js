'use strict';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const ACTIVE_CLASS = 'active';
const DELETE_BUTTON_CLASS = 'delete-user-btn';
const ADD_USER_BUTTON = 'form-btn';

const usersListTemplate = document.getElementById('users-template').innerHTML;
const userInformationTemplate = document.getElementById('user-information-template').innerHTML;
const newUserFormTemplate = document.getElementById('new-user-template').innerHTML;
const userInformation = document.getElementById('user-information-container');
const addButton = document.querySelector(`.${ADD_USER_BUTTON}`);
const deleteButton = document.querySelector(`.${DELETE_BUTTON_CLASS}`);
const newUserForm = document.getElementById('userForm');
const chatWrapper = document.getElementById('chat-wrapper');

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


function onSaveUserBtnClick(e) {
    e.preventDefault();
    addNewUser();
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
    console.log(list);
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
    if (event.target.classList.contains(DELETE_BUTTON_CLASS)) {
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


    if (element.classList.contains('user-item-name')) {
        toggleClass(element);
        getUserInformation(userID);
    }
}


function toggleClass(element) {
    removeActiveClass();
    addActiveClass(element);
}

function getInputValue(className) {
    return document.getElementsByClassName(`${className}`).value
}

function addNewUser() {
    const getNewId = document.querySelectorAll('.user-item-name').length + 1;


    let newUserData = [{
        id: getNewId,
        name: getInputValue('.name'),
        username: getInputValue('.username'),
        email: getInputValue('.email'),

        address: {
            street: getInputValue('.address'),
            suite: getInputValue('.suite'),
            city: getInputValue('.city'),
            zipcode: getInputValue('.zip'),
        },

        phone: getInputValue('.phone'),
        website: getInputValue('.website'),

        company: {
            name: getInputValue('.company-name'),
            catchPhrase: getInputValue('.catch-phrase'),
            bs: getInputValue('.bs')
        }
    }];

    fetch(USERS_URL, {
        method: 'POST',
        body: JSON.stringify(newUserData)
    }).then(() => {
        return usersList.innerHTML += renderUsersList(newUserData);
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

    document.querySelector(`[data-user-id='${userId}']`).parentElement;
    let getUserFromList = usersList.querySelector(`[data-user-id='${userId}']`);
    getUserFromList.parentNode.removeChild(getUserFromList);
    addActiveClass(usersList.firstElementChild);
    getUserInformation(usersList.firstElementChild.dataset.userId);
}




