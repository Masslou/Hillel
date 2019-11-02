$(function () {

    const DELETE_STICKER_CLASS = 'delete-sticker-btn';
    const STICKER_DESCRIPTION_CLASS = 'sticker-item--description';
    const STICKER_TITLE_CLASS = 'sticker-item--title';

    let stickersList = [];
    const $stickerTemplate = $('#stickersTemplate').html();
    const $modalWindow = $('#modal-window');
    const $stickersContainer = $('#stickers-container');
    const $addStickerButton = $('#add-sticker-button');
    const dialog = $modalWindow.dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            'Create an sticker': addSticker,
            Cancel: function () {
                dialog.dialog('close');
            }
        },
        close: function () {
            form[0].reset();
        }
    });

    const form = dialog.find('form').on('submit', onFormSubmit);
    $('#stickers-container').on('click', DELETE_STICKER_CLASS, onDeleteBtnClick);

    function onFormSubmit(event) {
        event.preventDefault();
        addSticker();
    }

    $addStickerButton.on('click', function () {
        dialog.dialog('open');
    });

    init();

    function init() {
        stickersList = getState();
        renderList(stickersList);
    }


    function addSticker() {
        let newSticker = {};
        form.serializeArray().forEach(v => newSticker[v.name] = v.value);
        newSticker.id = Date.now();
        stickersList.push(newSticker);
        renderList(stickersList);
        saveState();

        dialog.dialog('close');
    }


    function onStickerDescriptionFocusOut(e) {
        const element = e.target;
        const stickerID = element.parentNode.dataset.stickerId;

        saveNewStickerDescription(element.value, stickerID);

    }

    function onDeleteBtnClick(event) {
        const deletSticker = $(this).closest('.stickers-container-item');
        const stickerID = $deletSticker.data('stickerId');

        deletSticker.remove();
        deleteSticker(stickerID);
    }


    function saveState() {
        localStorage.setItem('stickers', JSON.stringify(stickersList));
    }


    function getState() {
        const data = localStorage.getItem('stickers');
        return data ? JSON.parse(data) : [];
    }


    function render() {
        renderList(stickersList);
        saveState();
    }

    function renderList(list) {
        const containerItemsHtml = list.map((sticker) => generateSticker(sticker));
        stickers_list_element.innerHTML = containerItemsHtml.join('');
    }

    function generateSticker(sticker) {
        const $sticker = $stickerTemplate.replace('{{id}}', sticker.id)
            .replace('{{title}}', sticker.title)
            .replace('{{text}}', sticker.description);

        $stickersContainer.append($sticker);
    }


    function saveNewStickerDescription(value, stickerID) {
        const currentSticker = stickersList.find((el) => el.id == stickerID);
        currentSticker.description = value;
        render();
    }

    function saveNewStickerTitle(value, stickerID) {
        const currentSticker = stickersList.find((el) => el.id == stickerID);
        currentSticker.title = value;
        render();
    }


    function deleteSticker(stickerID) {
        stickersList = stickersList.filter(el => el.id != stickerID);
        deleteStickerItemElement(stickerID);
        saveState();
    }

    function deleteStickerItemElement(id) {
        const element = getStickerItemElement(id);
        element && element.remove();
    }

    function getStickerItemElement(id) {
        return stickers_list_element.querySelector(`[data-sticker-id="${id}"]`);
    }
});
