$(function () {

    const DELETE_STICKER_CLASS = 'delete-sticker-btn';
    const STICKER_DESCRIPTION_CLASS = 'sticker-item--description';
    const STICKER_TITLE_CLASS = 'sticker-item--title';
    const STICKER_ITEM_CLASS = 'stickers-container-item';

    let stickersList = [];
    const stickerTemplate = $('#stickersTemplate').html();
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
    $('#stickers-container').on('click', `.${DELETE_STICKER_CLASS}`, onDeleteBtnClick);

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
        form.serializeArray().forEach(el => newSticker[el.name] = el.value);
        newSticker.id = Date.now();
        stickersList.push(newSticker);
        renderList(stickersList);
        saveState();

        dialog.dialog('close');
    }


    function onDeleteBtnClick() {
        const deletSticker = $(this).closest(`.${STICKER_ITEM_CLASS}`);
        const stickerID = deletSticker.data('stickerId');

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
        $stickersContainer.html(containerItemsHtml.join(''));
    }

    function generateSticker(sticker) {
        return stickerTemplate.replace('{{id}}', sticker.id)
            .replace('{{title}}', sticker.title)
            .replace('{{description}}', sticker.description);
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
        return $(`[data-sticker-id="${id}"]`);
    }
});
