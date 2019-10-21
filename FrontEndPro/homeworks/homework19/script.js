'use strict';

class Gallery {
    static GALLERY_URL = 'https://jsonplaceholder.typicode.com/photos?_limit=100';
    static HIDE_CLASS = 'hide';
    static CONTAINER_CLASS = 'flex-container';
    static CONTAINER_ITEM_NAME = 'flex-item';
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
        this.element = element;
        this.getPhotos();

    }

    getPhotos() {
        fetch(Gallery.GALLERY_URL).then((resp) => {
            resp.json()
                .then((data) => {
                    this.initGallery(data)
                });
        });
    }

    initGallery(data) {
        this.addPhotosContainer();
        this.addPhotosToGallery(data);
        this.addFullSizePhotosContainer();
        this.big_photo_item_elem = document.querySelector(`.${Gallery.BIG_PHOTO_ITEM_CLASS}`);
        this.big_photo_elem = document.querySelector(`.${Gallery.FULL_SIZE_PHOTO_BACKGROUND_CLASS}`);
        this.initPagination(data);

    }

    initPagination(data) {
        this.setPhotosStorage(data);
        this.showPaginationElem(data);
        this.a = this.getPhotosFromStorage();
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
            localStorage.setItem('currentPage', element.dataset.num);
            this.showCurrentPage();
        }
    }

    showCurrentPage() {
        let currentPage = localStorage.getItem('currentPage') || 0;
        this.a = this.getImages(currentPage);
        console.log(this.a)

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

    showPaginationElem(data) {
        let countPaginationPage = data.length / Gallery.PHOTO_ITEMS_AMOUNT_ON_PAGE;

        let paginationContainer = document.createElement('ul');
        this.addClass(paginationContainer, Gallery.PAGINATION_CONTAINER_CLASS);

        for (let i = 0; i <= countPaginationPage; i++) {
            paginationContainer.innerHTML += Gallery.PAGINATION_TEMPLATE.replace('{{itemnumber}}', i + 1).replace('{{num}}', i);
        }
        Gallery.PAGINATION_WRAPPER.appendChild(paginationContainer);
    }

    setPhotosStorage(data) {
        localStorage.setItem('photosData', JSON.stringify(data));
    }

    getPhotosFromStorage() {
        let data = localStorage.getItem('photosData');
        return JSON.parse(data);
    }


    getImages(page) {
        return this.getPhotosFromStorage().slice(page * Gallery.PHOTO_ITEMS_AMOUNT_ON_PAGE, (page + 1) * Gallery.PHOTO_ITEMS_AMOUNT_ON_PAGE);
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
