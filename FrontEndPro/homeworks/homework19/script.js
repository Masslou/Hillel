'use strict';

class Gallery {
    static GALLERY_URL = 'https://jsonplaceholder.typicode.com/photos?_limit=1000';
    static HIDE_CLASS = 'hide';
    static CONTAINER_CLASS = 'flex-container';
    static CONTAINER_ITEM_NAME = 'flex-item';
    static CURRENT_PAGE_STORAGE_ITEM = 'currentPage';
    static PAGINATION_CONTAINER_CLASS = 'pagination_container';
    static PHOTO_ITEM_CLASS = 'photo_item';
    static PAGINATION_ITEM_CLASS = 'pagination_item';
    static BIG_PHOTO_ITEM_CLASS = 'big_photo_item';
    static FULL_SIZE_PHOTO_BACKGROUND_CLASS = 'full_size_photo_background';
    static FULL_SIZE_PHOTO_CONTAINER_CLASS = 'full_size_photo_container';
    static PAGINATION_TEMPLATE = document.getElementById('paginationListTemplate').innerHTML;
    static PAGINATION_WRAPPER = document.getElementById('paginationWrapper');
    static PHOTO_ITEMS_AMOUNT_ON_PAGE = 50;


    constructor(element) {
        this.photosList = [];
        this.element = element;
        this.getPhotos();

    }

    getPhotos() {
        fetch(Gallery.GALLERY_URL).then((resp) => {
            resp.json()
                .then((data) => {
                    this.photosList = data;
                    this.initGallery();
                });
        });
    }

    initGallery() {
        this.addPhotosContainer();
        this.showCurrentPage();
        this.addFullSizePhotosContainer();
        this.big_photo_item_elem = document.querySelector(`.${Gallery.BIG_PHOTO_ITEM_CLASS}`);
        this.big_photo_elem = document.querySelector(`.${Gallery.FULL_SIZE_PHOTO_BACKGROUND_CLASS}`);
        this.initPagination(this.photosList);

    }

    initPagination() {
        this.showPaginationElem(this.photosList);
        this.bindListeners();
    }


    bindListeners() {
        this.element.addEventListener('click', this.onContainerClick.bind(this));
        Gallery.PAGINATION_WRAPPER.addEventListener('click', this.onPaginationClick.bind(this));
    }


    onContainerClick(event) {
        const element = event.target;

        if (element.classList.contains(Gallery.FULL_SIZE_PHOTO_CONTAINER_CLASS)) {
            this.onClickBackground(event);
        }
        if (element.classList.contains(Gallery.PHOTO_ITEM_CLASS)) {
            this.onClickMinPhoto(event);
        }
    }

    onPaginationClick(event) {
        const element = event.target;
        if (element.classList.contains(Gallery.PAGINATION_ITEM_CLASS)) {
            localStorage.setItem(`${Gallery.CURRENT_PAGE_STORAGE_ITEM}`, element.dataset.num);
            this.showCurrentPage();
        }
    }

    showCurrentPage() {
        let currentPage = localStorage.getItem(`${Gallery.CURRENT_PAGE_STORAGE_ITEM}`) || 0;
        this.addPhotosToGallery(this.getImages(currentPage));
    }


    onClickMinPhoto(e) {
        const currentElement = e.target;
        this.showFullSizePhoto(currentElement.fullImg);

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


    addPhotosToGallery(list) {

        list.forEach((item, i) => {

            const photo = list[i];
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

    showPaginationElem() {
        let countPaginationPage = Math.ceil(this.photosList.length / Gallery.PHOTO_ITEMS_AMOUNT_ON_PAGE);

        let paginationContainer = document.createElement('ul');
        this.addClass(paginationContainer, Gallery.PAGINATION_CONTAINER_CLASS);

        for (let i = 0; i < countPaginationPage; i++) {
            paginationContainer.innerHTML += Gallery.PAGINATION_TEMPLATE.replace('{{itemnumber}}', i + 1).replace('{{num}}', i);
        }
        Gallery.PAGINATION_WRAPPER.appendChild(paginationContainer);
    }


    getImages(pageNumber) {
        this.photosList.slice(pageNumber * Gallery.PHOTO_ITEMS_AMOUNT_ON_PAGE, (pageNumber + 1) * Gallery.PHOTO_ITEMS_AMOUNT_ON_PAGE);
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
