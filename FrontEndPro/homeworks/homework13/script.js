'use strict';

const PREV_BUTTON_CLASS = 'previous_picture--btn';
const NEXT_BUTTON_CLASS = 'next_picture--btn';
const HIDE_CLASS = 'hide';

class Gallery {


    constructor(container) {
        this.container = container;
        this.photos = container.querySelectorAll("ul li");
        this.length = this.photos.length;
        this.currentPhoto = 0;
        this.container.addEventListener('click', (e) => {
            this.eventHandler(e);
        }, false)
    }


    eventHandler(e) {

        if (e.target.classList.contains(PREV_BUTTON_CLASS)) {
            this.showPrev();
        }
        if (e.target.classList.contains(NEXT_BUTTON_CLASS)) {
            this.showNext();
        }
    }

    showNext() {
        this.photos[this.currentPhoto].classList.add(HIDE_CLASS);
        this.currentPhoto += 1;
        if (this.currentPhoto === this.length) {
            this.currentPhoto = 0;
        }
        this.photos[this.currentPhoto].classList.remove(HIDE_CLASS);
    }

    showPrev() {
        this.photos[this.currentPhoto].classList.add(HIDE_CLASS);
        this.currentPhoto -= 1;
        if (this.currentPhoto < 0) {
            this.currentPhoto = this.length - 1;
        }
        this.photos[this.currentPhoto].classList.remove(HIDE_CLASS);
    }

    circle() {
        setTimeout(() => {
            this.showNext();
            this.circle();
        }, 3000);
    }

    startGalleryShow() {
        this.photos.forEach(photo => {
            photo.classList.add(HIDE_CLASS);
        });
        this.photos[this.currentPhoto].classList.remove(HIDE_CLASS);
        this.circle();
    }
}

const myGallery = new Gallery(document.getElementById('container'));
myGallery.startGalleryShow();
