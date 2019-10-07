'use strict'

const CLASS_USER_DELETE = 'deleteUser';
const itemTemplate = document.getElementById('userListTemplate').innerHTML;
const userList = document.getElementById('UserList');

const userName = document.getElementById('UserName');
const userSurname = document.getElementById('UserSurname');
const userAge = document.getElementById('UserAge');

document.getElementById('newUser').addEventListener('submit', onFormSubmit);
userList.addEventListener('click', removeUser);

function onFormSubmit(e) {
    e.preventDefault();
    addNewUser();
}

function addNewUser() {
    if (userName.value.trim() !== '' &&
        userSurname.value.trim() !== '' &&
        userAge.value.trim() !== '') {
        userList.innerHTML += generateList(userName.value, userSurname.value, userAge.value);
        clearInput();
    } else {
        showError();
    }

}

function generateList(value1, value2, value3) {
    return itemTemplate.replace('{{name}}', value1)
        .replace('{{surname}}', value2)
        .replace('{{age}}', value3)
}

function removeUser(e) {
    const btnDelete = e.target;
    if (btnDelete.classList.contains(CLASS_USER_DELETE)) {
        btnDelete.parentElement.parentElement.remove();
    }
}

function clearInput(){
    userName.placeholder = '';
    userSurname.placeholder = '';
    userAge.placeholder = '';
    userName.value = '';
    userSurname.value = '';
    userAge.value = '';
}

function showError(){
    userName

    userName.placeholder = 'Fill the input';
    userSurname.placeholder = 'Fill the input';
    userAge.placeholder = 'Fill the input';
    userName.value = '';
    userSurname.value = '';
    userAge.value = '';
}
