'use strict';

const PREV_BUTTON_CLASS = 'previous_picture--btn';
const NEXT_BUTTON_CLASS = 'next_picture--btn';
const HIDE_CLASS = 'hide';


class Gallery {


    constructor(container) {
        this.container = container;
        this.container.innerHTML += `<div class="${PREV_BUTTON_CLASS}">< previous image</div><div class="${NEXT_BUTTON_CLASS}">next image ></div>`;
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
        this.addClass(this.photos[this.currentPhoto].classList, HIDE_CLASS);
        this.currentPhoto += 1;
        if (this.currentPhoto === this.length) {
            this.currentPhoto = 0;
        }
        this.removeClass(this.photos[this.currentPhoto].classList, HIDE_CLASS)
    }

    showPrev() {
        this.addClass(this.photos[this.currentPhoto].classList, HIDE_CLASS);
        this.currentPhoto -= 1;
        if (this.currentPhoto < 0) {
            this.currentPhoto = this.length - 1;
        }
        this.removeClass(this.photos[this.currentPhoto].classList, HIDE_CLASS)
    }

    circle() {
        setTimeout(() => {
            this.showNext();
            this.circle();
        }, 3000);
    }

    startGalleryShow() {
        this.photos.forEach(photo => {
            this.addClass(photo.classList, HIDE_CLASS);
        });
        this.removeClass(this.photos[this.currentPhoto].classList, HIDE_CLASS);
        this.circle();
    }

    removeClass(elem, className) {
        elem.remove(className);

    }

    addClass(elem, className) {
        elem.add(className)
    }
}

const myGallery = new Gallery(document.getElementById('container'));
myGallery.startGalleryShow();

/* Опциональное задание - реализовать такие методы */

// myGallery.show(2);
// myGallery.next();
// myGallery.prev();
