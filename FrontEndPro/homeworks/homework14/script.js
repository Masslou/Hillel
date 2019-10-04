'use strict';

const TABSET_CONTAINER_CLASS = 'tabset_container';
const ACTIVE_TAB_CLASS = 'active_tab';
const HIDE_CLASS = 'hide';


class TabSet {
    constructor(el) {
        this.el = el;
        this.bindClass(this.el, TABSET_CONTAINER_CLASS);
        this.tabsContainer = el.querySelector('#tabs');
        this.tabs = el.querySelectorAll('.tabset-heading');
        this.tabsBody = el.querySelectorAll('.tabset-body');
        this.bindHideToAllTabsBody();
        this.removeClass(this.tabsBody[0], HIDE_CLASS);
        this.bindClass(this.tabs[0], ACTIVE_TAB_CLASS);


        // this.length = this.tabs.length;
        // this.counter = 0;

        this.bindEventListeners();


    }

    bindClass(element, className) {
        if (element && className) {
            element.classList.add(className);
        }
    }

    removeClass(element, className) {
        if (element && className) {
            element.classList.remove(className);
        }
    }


    bindHideToAllTabsBody() {
        if (this.tabsBody) {
            this.tabsBody.forEach((el) => {
                this.bindClass(el, HIDE_CLASS)
            });
        }
    }


    removeClassToAllTabs() {
        if (this.tabs) {
            this.tabs.forEach((el) => {
                this.removeClass(el, ACTIVE_TAB_CLASS)
            });
        }
    }


    bindEventListeners() {
        this.tabsContainer.addEventListener('click', this.onElementClick.bind(this))
    }

    isActiveTab(element) {
        return element.classList.contains(ACTIVE_TAB_CLASS);

    }

    onElementClick(e) {
        if (this.isActiveTab(e.target)) {
            return
        }
        this.tabs.forEach((el, i) => {
            this.removeClass(this.tabs[i], ACTIVE_TAB_CLASS);

            if (el === e.target) {
                this.bindHideToAllTabsBody();
                this.removeClass(this.tabsBody[i], HIDE_CLASS);
                this.bindClass(e.target, ACTIVE_TAB_CLASS);
            }
        });
    }

    showTab(index) {

        this.removeClassToAllTabs();
        this.bindHideToAllTabsBody();
        this.removeClass(this.tabsBody[index], HIDE_CLASS);
        this.bindClass(this.tabs[index], ACTIVE_TAB_CLASS);
        // this.counter = index;
    }

    preventTab() {


    }


    nextTab() {

    }

}

const acc = new TabSet(
    document.getElementById('container')
);
