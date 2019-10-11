'use strict';

class Gallery {
    static GALLERY_URL = 'https://jsonplaceholder.typicode.com/photos?_limit=50';
    static HIDE_CLASS = 'hide';
    static CONTAINER_CLASS = 'flex-container';
    static CONTAINER_ITEM_NAME = 'flex-item';
    static FULL_SIZE_PHOTO_BACKGROUND_CLASS = 'full_size_photo_background';
    static PHOTO_CLASS = 'image';

    static backgroundElem = document.getElementsByClassName(Gallery.FULL_SIZE_PHOTO_BACKGROUND_CLASS);


    constructor(element) {
        this.element = element;

        this.initGallery();

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

    eventHandler(e) {
        let element = e.target;

        if (element.classList.contains(Gallery.FULL_SIZE_PHOTO_BACKGROUND_CLASS)) {
            this.removeBackground(e);
        }

        if (element.classList.contains(Gallery.PHOTO_CLASS)) {
            console.log(element.dataset);
            console.log(element.fullImg);
            this.showFullSizeImage(element, element.fullImg);
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
        this.element.appendChild(container);
    }

    addPhotosToGallery() {
        if (this.photos) {

            for (let i = 0; i < this.photos.length; i++) {

                const photo = this.photos[i];
                const li = document.createElement('li');
                this.addClass(li, Gallery.CONTAINER_ITEM_NAME);


                const img = document.createElement('img');
                this.addClass(img, Gallery.PHOTO_CLASS);

                img.src = `${photo.thumbnailUrl}`;
                img.fullImg = `${photo.url}`;
                li.appendChild(img);

                this.container.appendChild(li);

            }
        }
    }


    showFullSizeImage(element, fullSizeSrc) {

        const img = document.createElement('img');
        console.log(Gallery.backgroundElem);
        Gallery.backgroundElem.item(0).appendChild(img);
        img.src = fullSizeSrc;

        this.removeClass(Gallery.backgroundElem.item(0), Gallery.HIDE_CLASS);


    }

    removeClass(element, className) {
        element.classList.remove(className);
    }


    removeBackground(e) {
        this.addClass(document.querySelector('.full_size_photo_background'), Gallery.HIDE_CLASS);
    }

    addClass(element, className) {
        element.classList.add(className);
    }
}

const myGallery = new Gallery(document.getElementById('container'));
