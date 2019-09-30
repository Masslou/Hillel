'use strict';

class Gallery {

    constructor(container) {
        this.container = this.addWrapperToContainer(container);
        this.container = this.addButtonsToContainer(this.container)
        this.photos = container.querySelectorAll('ul li');
        this.counter = 0;
        this.length = this.photos.length;
        this.container.addEventListener('click', this.actionHandler.bind(this));

    }

    addWrapperToContainer(container) {
        console.log(document.body);
        container.insertAdjacentHTML('beforebegin', `<div id="container_wrapper">`);
        console.log(document.body);
        return container;
    }

    addButtonsToContainer(container) {
        container.insertAdjacentHTML('beforeEnd', `<div class="previous_picture--btn">prev</div> <div class="next_picture--btn">next</div>`);
        return container;
    }

    showImage(imagePositionNumber) {
        this.photos.forEach((element) => {
            element.classList.add('hide_elm');
        });
        if (imagePositionNumber < this.length) {
            this.photos[imagePositionNumber].classList.remove('hide_elm');
            this.counter = imagePositionNumber;
        }


    }

    actionHandler(event) {
        if (event.target.classList.contains('next_picture--btn')) {
            this.showNextImage()
        }
        if (event.target.classList.contains('previous_picture--btn')) {
            this.showPreviousImage()
        }
    }

    showPreviousImage() {

        if (this.counter > 0) {
            this.photos[this.counter].classList.add('hide_elm');
        }
        this.counter -= 1;
        if (this.counter === 0) {
            this.counter = this.length - 1;
        }
        this.photos[this.counter].classList.remove('hide_elm');
        clearTimeout();
        this.circle();
    }


    showNextImage() {


        if (this.counter < this.length) {
            this.counter += 1;
        }
        if (this.counter > 0) {
            this.photos[this.counter - 1].classList.add('hide_elm');
        }
        if (this.counter === this.length) {
            this.counter = 0;
        }
        this.photos[this.counter].classList.remove('hide_elm');
        // if (this.counter < this.length) {
        //     this.counter += 1;
        // }
    }

    startGallery() {

        this.photos.forEach((element) => {
            element.classList.add('hide_elm');
        });
        this.photos[this.counter].classList.remove('hide_elem');
        this.circle();
    }

    circle() {
        this.showNextImage();

        setTimeout(() => {
            this.showNextImage()
            this.circle();
        }, 3000);
    }


}

const myGallery = new Gallery(
    document.getElementById('container')
);
window.gallery1 = myGallery;
myGallery.startGallery();
