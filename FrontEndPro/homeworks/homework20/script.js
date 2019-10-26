'use strict';

const MAIN_CONTAINER = document.getElementById('stickers_container');
const stickers_list_element = document.getElementById('stickers-container');
const ADD_STICKER_BUTTON = document.getElementById('add-sticker-button');
const STICKER_TEMPLATE = document.getElementById('stickersTemplate').innerHTML;
const DELETE_STICKER_CLASS = 'delete-sticker-btn';
const STCKER_DESCRIPTION = document.getElementById('const DELETE_STICKER_BUTTON = document.getElementById(\'delete-sticker-description-body-btn\');\n');


stickers_list_element.addEventListener('click', onStickersContainerClick);
ADD_STICKER_BUTTON.addEventListener('mouseover', hover);
ADD_STICKER_BUTTON.addEventListener('mouseout', unhover);
ADD_STICKER_BUTTON.addEventListener('click', onCreateStickerBtnClick);

let stickersList;

init();


function hover(e) {
    const element = e.target;
    element.setAttribute('src', 'https://img.icons8.com/plasticine/100/000000/fat-emoji.png');
}

function unhover(e) {
    const element = e.target;
    element.setAttribute('src', 'https://img.icons8.com/plasticine/100/000000/anime-emoji.png');
}

function onCreateStickerBtnClick(e) {
    const newSticker = {
        id: Date.now(),
        title: '',
        description: ''
    };

    stickers_list_element.insertAdjacentHTML('beforeend', generateSticker(newSticker));
    stickersList.push(newSticker);

    saveState();
}

function saveState() {
    localStorage.setItem('stickers', JSON.stringify(stickersList));
}


function init() {
    stickersList = getState();
    renderList(stickersList);
}

function getState() {
    const data = localStorage.getItem('stickersList');
    return data ? JSON.parse(data) : [];
}

function render() {
    renderList(stickersList)
}


function renderList(list) {
    const containerItemsHtml = list.map((sticker) => generateSticker(sticker));
    stickers_list_element.innerHTML = containerItemsHtml.join('');
}


function generateSticker(sticker) {
    return STICKER_TEMPLATE.replace('{{id}}', sticker.id)
        .replace('{{title}}', sticker.title)
        .replace('{{description}}', sticker.description)
}

function onStickersContainerClick(e) {
    const element = e.target;
    const stickerID = element.parentNode.dataset.stickerId;

if (element.classList.contains(DELETE_STICKER_CLASS)){
    deleteSticker(stickerID)
}

}


function deleteSticker(stickerID) {
    stickersList = stickersList.filter(el => el.id != stickerID);

    deleteStickerItemElement(stickerID)
}


function deleteStickerItemElement(id) {
    const element = getStickerItemElement(id);

    element && element.remove();
}


function getStickerItemElement(id) {
    return stickers_list_element.querySelector(`[data-sticker-id="${id}"]`);
}
