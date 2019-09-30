class Gallery {
    constructor(container) {
        this.container = container;
        this.container.innerHTML += `<div class='prev'>Prev</div><div class='next'>Next</div>`;
        this.photos = container.querySelectorAll("ul li");
        this.length = this.photos.length;
        this.currentPhoto = 0;
        this.container.addEventListener('click',(e)=>{
            this.eventHandler(e);
        }, false)
    }
    eventHandler(e){
        if(e.target.classList.contains('prev')){
            this.showPrev();
        }
        if(e.target.classList.contains('next')){
            this.showNext();
        }
    }
    showNext() {
        this.photos[this.currentPhoto].classList.add("hide");
        this.currentPhoto += 1;
        if(this.currentPhoto === this.length){
            this.currentPhoto = 0;
        }
        this.photos[this.currentPhoto].classList.remove("hide");
    }

    showPrev() {
        this.photos[this.currentPhoto].classList.add("hide");
        this.currentPhoto -= 1;
        if(this.currentPhoto < 0){
            this.currentPhoto = this.length-1;
        }
        this.photos[this.currentPhoto].classList.remove("hide");
    }

    circle() {
        setTimeout(() => {
            this.showNext();
            this.circle();
        }, 3000);
    }
    startGalleryShow() {
        this.photos.forEach(photo => {
            photo.classList.add("hide");
        });
        this.photos[this.currentPhoto].classList.remove("hide");
        this.circle();
    }
}

const myGallery = new Gallery(document.getElementById("container"));
myGallery.startGalleryShow();

/* Опциональное задание - реализовать такие методы */

// myGallery.show(2);
// myGallery.next();
// myGallery.prev();
