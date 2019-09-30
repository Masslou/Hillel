'use strict';

const ACCORDEON_CONTAINER_CLASS = 'my-accordeon-container';
const ACCORDEON_TITLE_CLASS = 'title';

class Accordeon {
    constructor(el) {
        this.el = el;
        this.bindClasses();
        this.bindEventListners();

    }

    bindClasses() {
        this.el.className.add(ACCORDEON_CONTAINER_CLASS);
    }

    bindEventListners() {
        this.el.addEventListener('click', this.onElementClick)
    }

    onElementClick(e) {
        console.log('clocked', e.target);

        if (e.target.classList.contains(ACCORDEON_TITLE_CLASS)) {
            
        }
    }

}

const acc = new Accordeon(
    document.getElementById('container')
);
