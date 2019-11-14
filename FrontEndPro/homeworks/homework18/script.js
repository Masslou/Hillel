
const RESOURCE_URL = 'https://jsonplaceholder.typicode.com/users/';

const ITEM_USER_CLASS = 'userItem';
const ITEM_ACTIVE_CLASS = 'active';
const DELETE_USER_BUTTON_CLASS = 'deleteUser';
const ADD_USER_BUTTON_CLASS = 'addNewUser';

const METHOD_POST = 'POST';
const METHOD_DELETE = 'DELETE';

const nameInput = document.getElementById('name');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const websiteInput = document.getElementById('website');
const deleteUserBtn = document.getElementById(DELETE_USER_BUTTON_CLASS);
const addUserBtn = document.getElementById(ADD_USER_BUTTON_CLASS);

const userListTemplate = document.getElementById('userListTemplate').innerHTML;
const usersListItems = document.createElement('ul');

const createNewUser = document.createElement('li');
createNewUser.classList.add('createNewUser');
createNewUser.innerText = 'Create new user';

const usersList = document.getElementById('usersList');
const userInfo = document.getElementById('userInfo');
usersList.addEventListener('click', onUserClick);

const userForm = document.getElementById('userForm');
userForm.addEventListener('click', onControlBtnClick);

const requestUsersList = fetch(RESOURCE_URL);

requestUsersList.then((resp) => {
    return resp.json()
})
    .then((data) => {
        renderUsersList(data);
        showControlBtn();
    })
    .catch(() => console.log('Error'))

function renderUsersList(data){
    data.forEach(el => addUserInList(el.name, el.id));
    usersListItems.prepend(createNewUser);
    usersList.appendChild(usersListItems);
    addActiveClass(usersListItems.firstElementChild);
    showControlBtn();
}

function addUserInList(name, id){
    usersListItems.innerHTML += userListTemplate.replace('{{name}}', name)
        .replace('{{userid}}', id);
}

function renderUserInfo(data){
    nameInput.value = data.name;
    usernameInput.value = data.username;
    emailInput.value = data.email;
    phoneInput.value = data.phone;
    websiteInput.value = data.website;
    deleteUserBtn.setAttribute('data-userId', data.id);
}

function showControlBtn(){
    if(usersList.firstElementChild.firstChild.classList.contains(ITEM_ACTIVE_CLASS)){
        addUserBtn.classList.remove('d-none');
        deleteUserBtn.classList.add('d-none');
    }
    else{
        deleteUserBtn.classList.remove('d-none');
        addUserBtn.classList.add('d-none');
    }
}

function onUserClick(e){
    if(e.target.classList.contains(ITEM_USER_CLASS)){
        showUserInfo(e.target.dataset.userid)
        deleteActiveClass();
        addActiveClass(e.target);
        resetUserForm();
        showControlBtn();
    } else {
        deleteActiveClass();
        addActiveClass(e.target);
        resetUserForm();
        showControlBtn();
    }
}

function showUserInfo(user){
    fetch(RESOURCE_URL + user)
        .then((resp) => {
            return resp.json()
        })
        .then((data) => {
            renderUserInfo(data);
        })
}

function onControlBtnClick(e){
    e.preventDefault();
    if(e.target.classList.contains(DELETE_USER_BUTTON_CLASS)){
        deleteUser(METHOD_DELETE, e.target.dataset.userid)
    }
    else if(e.target.classList.contains(ADD_USER_BUTTON_CLASS)){
        addNewUser(METHOD_POST)
    }
}

function deleteUser(method, userid){
    fetch(RESOURCE_URL + userid, {
        method: method
    }).then(() => {
        usersList.querySelector('.active').remove();
        addActiveClass(usersListItems.firstElementChild);
        resetUserForm();
        showControlBtn();
    });
}

function addNewUser(method){
    let newUserInfo = {
        name: nameInput.value,
        username: usernameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        website: websiteInput.value
    };

    fetch(RESOURCE_URL, {
        method: method,
        body: JSON.stringify(newUserInfo)
    })
        .then((resp) => {
            return resp.json()
        })
        .then((data) => {
            resetUserForm();
            addUserInList(newUserInfo.username, data.id)
        })
}

function deleteActiveClass(){
    usersList.querySelector('.active').classList.remove(ITEM_ACTIVE_CLASS)
}

function addActiveClass(el){
    el.classList.add(ITEM_ACTIVE_CLASS);
}

function resetUserForm(){
    userForm.reset();
}
