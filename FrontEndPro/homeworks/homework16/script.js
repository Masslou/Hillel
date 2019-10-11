'use strict';

class Gallery {
    static GALLERY_URL = 'https://jsonplaceholder.typicode.com/photos?_limit=50';
    static HIDE_CLASS = 'hide';
    static CONTAINER_CLASS = 'flex-container';
    static CONTAINER_ITEM_NAME = 'flex-item';
    static FULL_SIZE_PHOTO_BACKGROUND_CLASS = 'full_size_photo_background';
    static FULL_SIZE_PHOTO_CONTAINER_CLASS = 'full_size_photo_container';

    static full_size_background_element = document.querySelector(Gallery.FULL_SIZE_PHOTO_BACKGROUND_CLASS);
    static full_size_photo_container = document.querySelector(Gallery.FULL_SIZE_PHOTO_CONTAINER_CLASS);


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
        this.element.addEventListener('click', this.onClickMinImage.bind(this));
        Gallery.full_size_background_element.addEventListener('click', this.onClickRemoveBackground.bind(this));
    }


    onClickMinImage(e) {
        const currentElement = e.target;
        if (currentElement.classList.contains(Gallery.CONTAINER_ITEM_NAME)) {
            this.showFullSizeImage(currentElement.dataset.fullImg);
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
                this.addClass(img, Gallery.CONTAINER_ITEM_NAME);

                img.src = `${photo.thumbnailUrl}`;
                img.fullImg = `${photo.url}`;
                li.appendChild(img);

                this.container.appendChild(li);

            }
        }
    }


    showFullSizeImage(fullSizeSrc) {
        Gallery.full_size_photo_container.innerHTML = `<img src="${fullSizeSrc}"/>`;
        this.removeClass(Gallery.full_size_background_element, Gallery.HIDE_CLASS);


    }

    removeClass(element, className) {
        element.classList.remove(className);
    }


    onClickRemoveBackground() {
        this.addClass(Gallery.full_size_background_element, Gallery.HIDE_CLASS);
    }

    addClass(element, className) {
        element.classList.add(className);
    }
}

const myGallery = new Gallery(document.getElementById('container'));
