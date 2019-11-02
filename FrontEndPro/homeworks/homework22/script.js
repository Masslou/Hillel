$(function () {

    const DELETE_STICKER_CLASS = 'delete-sticker-btn';
    const STICKER_DESCRIPTION_CLASS = 'sticker-item--description';
    const STICKER_TITLE_CLASS = 'sticker-item--title';

    let stickersList;
    const $stickerTemplate = $('#stickersTemplate').html();
    const $stickersContainer = $('#stickers-container');
    const $addStickerButton = $('');
    const $dialog = $( "#dialog-form" ).dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            "Create an account": addUser,
            Cancel: function() {
                dialog.dialog( "close" );
            }
        },
        close: function() {
            form[ 0 ].reset();
            // allFields.removeClass( "ui-state-error" );
        }
    });

    const $form = $dialog.find( "form" ).on( "submit", function( event ) {
        event.preventDefault();
        addUser();
    });

    $addStickerButton.button().on( "click", function() {
        dialog.dialog( "open" );
    });



    // $('addNoteBtn').on('clock', ()=> )


    init();

    function init() {
        stickersList = getState();
        renderList(stickersList);
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


    function onStickerDescriptionFocusOut(e) {
        const element = e.target;
        const stickerID = element.parentNode.dataset.stickerId;

        saveNewStickerDescription(element.value, stickerID);

    }


    function onStickerTitleFocusOut(e) {
        const element = e.target;
        const stickerID = element.parentNode.dataset.stickerId;

        saveNewStickerTitle(element.value, stickerID);
    }


    function onStickersContainerClick(e) {
        const element = e.target;
        const stickerID = element.parentNode.dataset.stickerId;

        switch (true) {
            case element.classList.contains(DELETE_STICKER_CLASS) :
                deleteSticker(stickerID);
                break;

            case element.classList.contains(STICKER_DESCRIPTION_CLASS) :
                element.addEventListener('focusout', onStickerDescriptionFocusOut, {once: true});
                break;

            case element.classList.contains(STICKER_TITLE_CLASS) :
                element.addEventListener('focusout', onStickerTitleFocusOut, {once: true});
                break;
        }
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
            .replace('{{description}}', sticker.description);

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
