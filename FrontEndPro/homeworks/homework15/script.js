'use strict';

class PhoneBook {

    static ERROR_CLASS = 'error';
    static VALID_CLASS = 'valid';
    static DELETE_BUTTON_CLASS = 'deleteContact';

    static itemTemplate = document.getElementById('contactListTemplate').innerHTML;
    static contactList = document.getElementById('contactList');
    static contactName = document.getElementById('contactName');
    static contactSurname = document.getElementById('contactSurname');
    static contactPhone = document.getElementById('contactPhone');
    static form = document.getElementById('newContact');


    constructor() {
        this.initApp();
    }


    initApp() {
        this.bindEventListenerOnSubmit();
        this.bindEventListenerOnRemove();
    }


    bindEventListenerOnSubmit() {
        PhoneBook.form.addEventListener('submit', this.onFormSubmit.bind(this));
    }


    bindEventListenerOnRemove() {
        PhoneBook.contactList.addEventListener('click', this.onRemoveClick);
    }


    onFormSubmit(event) {
        event.preventDefault();
        if (this.fieldsValidation()) {
            this.addElemToList();
        }
    }


    addElemToList() {
        const html = this.createContact(PhoneBook.contactName.value, PhoneBook.contactSurname.value, PhoneBook.contactPhone.value);
        const newContactElement = this.htmlToElement(html);
        PhoneBook.contactList.appendChild(newContactElement);
        this.resetForm();

    }


    createContact(name, surname, phone) {
        return PhoneBook.itemTemplate
            .replace('{{name}}', name)
            .replace('{{surname}}', surname)
            .replace('{{phone}}', phone)
    }


    htmlToElement(html) {
        const template = document.createElement('template');
        html = html.trim();
        template.innerHTML = html;
        return template.content.firstChild;
    }

    resetForm() {
        this.clearInput();
        this.moveCursorToInput(PhoneBook.contactName)
    }


    clearInput() {
        PhoneBook.contactName.value = '';
        PhoneBook.contactSurname.value = '';
        PhoneBook.contactPhone.value = '';
    }


    onRemoveClick(event) {
        const deleteButton = event.target;
        if (deleteButton.classList.contains(PhoneBook.DELETE_BUTTON_CLASS)) {
            deleteButton.parentElement.parentElement.remove();
        }
    }


    fieldsValidation() {

        return this.initialsValidation(PhoneBook.contactName) &&
            this.initialsValidation(PhoneBook.contactSurname) &&
            this.phoneValidation(PhoneBook.contactPhone);
    }

    initialsValidation(user) {
        const nameRegExp = /^[a-zA-Z ]+$/;
        const nameValid = nameRegExp.test(user.value);
        nameValid ? this.addClass(user, PhoneBook.VALID_CLASS) : this.addClass(user, PhoneBook.ERROR_CLASS);

        return nameValid;
    }


    phoneValidation(user) {
        const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        const phoneValid = phoneRegExp.test(PhoneBook.contactPhone.value);
        phoneValid ? this.addClass(user, PhoneBook.VALID_CLASS) : this.addClass(user, PhoneBook.ERROR_CLASS);

        return phoneValid;
    }

    addClass(element, className) {
        element.classList.add(className);
    }

    moveCursorToInput(element) {
        element.focus();
    }
}

const myPhoneBook = new PhoneBook(document.getElementById('container'));
