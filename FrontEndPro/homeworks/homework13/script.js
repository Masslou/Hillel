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
        this.mainActions();

    }

    mainActions() {
        this.addListeners();
        this.createNavButtons();
        this.startGalleryShow();
    }

    addListeners() {
        this.container.addEventListener('click', (e) => {
            this.eventHandler(e);
        }, false)
    }

    createNavButtons() {
        const previuosButton = document.createElement('div');
        const nextButton = document.createElement('div');

        previuosButton.classList.add(PREV_BUTTON_CLASS);
        previuosButton.innerHTML = '< previous';

        nextButton.classList.add(NEXT_BUTTON_CLASS);
        nextButton.innerHTML = 'next >';

        this.container.appendChild(previuosButton);
        this.container.appendChild(nextButton);
    }

    eventHandler(e) {
        if (e.target.classList.contains(PREV_BUTTON_CLASS)) {
            this.showPrev();
        }
        if (e.target.classList.contains(NEXT_BUTTON_CLASS)) {
            this.showNext();
        }
    }

    addHideClass(elem) {
        elem.classList.add(HIDE_CLASS)
    }

    removeHideClass(elem) {
        elem.classList.remove(HIDE_CLASS)
    }


    showNext() {
        this.addHideClass(this.photos[this.currentPhoto]);
        this.currentPhoto += 1;
        if (this.currentPhoto === this.length) {
            this.currentPhoto = 0;
        }
        this.removeHideClass(this.photos[this.currentPhoto]);
    }

    showPrev() {
        this.addHideClass(this.photos[this.currentPhoto]);
        this.currentPhoto -= 1;
        if (this.currentPhoto < 0) {
            this.currentPhoto = this.length - 1;
        }
        this.removeHideClass(this.photos[this.currentPhoto]);
    }

    circle() {
        setTimeout(() => {
            this.showNext();
            this.circle();
        }, 3000);
    }

    startGalleryShow() {
        this.photos.forEach(photo => {
            this.addHideClass(photo);
        });
        this.removeHideClass(this.photos[this.currentPhoto]);
        this.circle();
    }
}

const myGallery = new Gallery(document.getElementById('container'));

// Методы доступны в консоли
/* Опциональное задание - реализовать такие методы */

// myGallery.show(2);
// myGallery.next();
// myGallery.prev();

