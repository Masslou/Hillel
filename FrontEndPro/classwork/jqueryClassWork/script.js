'use strict';
$(function(){
    const BTTN_DEL_CLASS = '.bttn-delete';
    const DARK_BACKGROUND_CLASS = 'background';
    const STICKER_POSITION_VAL = 'absolute';
    const DATA_STICKER_ID = 'stickerId';

    const $bttnAddSticker = $('#add-sticker');
    const $board = $('#board');
    const $stickerHTML = $('#sticker-temp').html();
    const $stickersContainer = $('#stickers-container');
    const $modalWindow = $('#modal-window');
    const $modalForm = $('#modal-form');

    let dataStickers = getActualData();

    const modalWindowForCreatingSticker = $modalWindow.dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            'Create sticker': function() {
                addSticker();
                $modalWindow.dialog( 'close' );
                draggableItem();
            },
            Cancel: function() {
                $modalWindow.dialog( 'close' );
            }
        },
        close: function() {
            $('#modal-form')[0].reset();
            $board.removeClass(DARK_BACKGROUND_CLASS);
        }
    });


    $modalForm.submit(function(event) {
        event.preventDefault();
        addSticker();
    });
    $bttnAddSticker.click(onBttnAddStickerClick);
    $stickersContainer.on('click', BTTN_DEL_CLASS, onBttnDelStickerClick);

    function onBttnAddStickerClick(){
        modalWindowForCreatingSticker.dialog('open');
    }
    function onBttnDelStickerClick(e){
        const deleteItem = $(e.target).closest('.sticker-container');

        const idElem = getDataAttrb(deleteItem, DATA_STICKER_ID);
        removeDataFromLS(idElem);
        delElem(idElem);
        console.log('work!')
    }

    init();
    function init(){
        dataStickers.map(renderDataSticker);
        draggableItem();

    }
    function draggableItem(){
        $( ".sticker-container" ).draggable({
            stop:function( e, ui ){
                const $draggableElem = $(e.target);
                const elemId = getDataAttrb($draggableElem, DATA_STICKER_ID);

                getDataItem(elemId).position = STICKER_POSITION_VAL;
                $.extend(getDataItem(elemId), ui.offset);
                setDataLS('stickers:', dataStickers);
            }
        });
    }

    function addSticker(){
        const arrayDataNewSticker = getObjDataSticker();

        renderDataSticker(arrayDataNewSticker);

        dataStickers.push(arrayDataNewSticker);
        setDataLS('stickers:',  dataStickers);
    }

    function renderDataSticker(titleElem){
        const $elem = $stickerHTML.replace('{{id-sticker}}', titleElem.id)
            .replace('{{title}}', titleElem.title)
            .replace('{{text}}', titleElem.description)
            .replace('{{top}}', titleElem.top || 0)
            .replace('{{left}}', titleElem.left || 0)
            .replace('{{position}}', titleElem.position || 'relative');
        $stickersContainer.append($elem);
    }

    function setDataLS(name, data){
        localStorage.setItem(name, JSON.stringify(data));
    }
    function getDataLS(name){
        return localStorage.getItem(name);
    }
    function getObjDataSticker(){
        let arrayData = {id:Date.now()};
        $modalForm.serializeArray().forEach(({name, value}) => arrayData[name] = value);
        return arrayData;
    }
    function getActualData(){
        return JSON.parse(getDataLS('stickers:')) || [];
    }
    function getDataItem(elemId){
        return  dataStickers.find(el => el.id == elemId);
    }
    function getDataAttrb(elem, nameData){
        return elem.data(nameData);
    }

    function delElem(elemId){
        const selectedSticker = getElemById(elemId);
        selectedSticker.remove();
    }
    function removeDataFromLS(elemId){
        const deletedItemData = getDataItem(elemId);

        dataStickers = dataStickers.filter(el => el !== deletedItemData);
        setDataLS('stickers:', dataStickers);
    }
    function getElemById(elemId) {
        return $(`[data-sticker-id="${elemId}"]`)
    }
});
