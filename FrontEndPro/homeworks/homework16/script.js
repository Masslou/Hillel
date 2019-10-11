'use strict';

class Gallery {
    static GALLERY_URL = 'https://jsonplaceholder.typicode.com/photos?_limit=50';
    static HIDE_CLASS = 'hide';
    static CONTAINER_CLASS = 'flex-container';
    static CONTAINER_ITEM_NAME = 'flex-item';
    static PHOTO_ITEM_CLASS = 'photo_item';
    static BIG_PHOTO_ITEM_CLASS = 'big_photo_item';
    static FULL_SIZE_PHOTO_BACKGROUND_CLASS = 'full_size_photo_background';
    static FULL_SIZE_PHOTO_CONTAINER_CLASS = 'full_size_photo_container';


    constructor(element) {
        this.element = element;
        this.initGallery();
        this.big_photo_item_elem = document.querySelector(`.${Gallery.BIG_PHOTO_ITEM_CLASS}`);
        this.big_photo_elem = document.querySelector(`.${Gallery.FULL_SIZE_PHOTO_BACKGROUND_CLASS}`);


    }

    initGallery() {
        this.addPhotosContainer();
        this.getPhotos();
        this.addFullSizePhotosContainer();
        this.bindListeners();
    }


    bindListeners() {
        this.element.addEventListener('click', this.eventHandler.bind(this));
    }


    eventHandler(event) {

        if (event.target.classList.contains(Gallery.FULL_SIZE_PHOTO_CONTAINER_CLASS)) {
            this.onClickBackground(event);

        }

        if (event.target.classList.contains(Gallery.PHOTO_ITEM_CLASS)) {
            this.onClickMinPhoto(event);
        }
    }


    onClickMinPhoto(e) {
        const currentElement = e.target;
        if (currentElement.classList.contains(Gallery.PHOTO_ITEM_CLASS)) {
            this.showFullSizePhoto(currentElement.fullImg);
        }
    }


    getPhotos() {
        fetch(Gallery.GALLERY_URL).then((resp) => {
            resp.json().then((data) => {
                this.photos = data;
                this.addPhotosToGallery();
            })
        });
    }


    addPhotosContainer() {
        this.container = document.createElement('ul');
        this.container.className = Gallery.CONTAINER_CLASS;
        this.element.appendChild(this.container);

    }


    addFullSizePhotosContainer() {
        const container = document.createElement('div');
        this.addClass(container, Gallery.FULL_SIZE_PHOTO_BACKGROUND_CLASS);
        this.addClass(container, Gallery.HIDE_CLASS);

        const photoContainer = document.createElement('div');
        this.addClass(photoContainer, Gallery.FULL_SIZE_PHOTO_CONTAINER_CLASS);

        const img = document.createElement('img');
        this.addClass(img, Gallery.BIG_PHOTO_ITEM_CLASS);

        photoContainer.appendChild(img);
        container.appendChild(photoContainer);

        this.element.appendChild(container);
    }


    addPhotosToGallery() {
        if (this.photos) {

            this.photos.forEach((item, i) => {

                const photo = this.photos[i];
                const li = document.createElement('li');
                this.addClass(li, Gallery.CONTAINER_ITEM_NAME);


                const img = document.createElement('img');
                this.addClass(img, Gallery.PHOTO_ITEM_CLASS);

                img.src = `${photo.thumbnailUrl}`;
                img.fullImg = `${photo.url}`;
                li.appendChild(img);

                this.container.appendChild(li);

            });
        }
    }


    showFullSizePhoto(fullSizeSrc) {
        this.big_photo_item_elem.src = `${fullSizeSrc}`;
        this.removeClass(this.big_photo_elem, Gallery.HIDE_CLASS);
    }


    removeClass(element, className) {
        element.classList.remove(className);
    }


    onClickBackground() {
        this.addClass(this.big_photo_elem, Gallery.HIDE_CLASS);
    }


    addClass(element, className) {
        element.classList.add(className);
    }

}

const myGallery = new Gallery(document.getElementById('container'));
