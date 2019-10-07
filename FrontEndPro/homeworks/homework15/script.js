'use strict';

class PhoneBook {

    static ERROR_CLASS = 'error';
    static VALID_CLASS = 'valid';
    static DELETE_BUTTON_CLASS = 'deleteContact';

    static form = document.getElementById('newContact');
    static itemTemplate = document.getElementById('contactListTemplate').innerHTML;
    static contactList = document.getElementById('contactList');
    static contactName = document.getElementById('contactName');
    static contactSurname = document.getElementById('contactSurname');
    static contactPhone = document.getElementById('contactPhone');


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
        this.removeClassesToAllInputs(PhoneBook.contactName, PhoneBook.contactSurname, PhoneBook.contactPhone);
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
        const contactName = this.initialsValidation(PhoneBook.contactName);
        const contactSurname = this.initialsValidation(PhoneBook.contactSurname);
        const contactPhone = this.phoneValidation(PhoneBook.contactPhone);

        return contactName && contactSurname && contactPhone;
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

    removeClassesToAllInputs(...inputs) {
        inputs.forEach((el) => {
            el.className = '';
        });
    }

    moveCursorToInput(element) {
        element.focus();
    }
}

const myPhoneBook = new PhoneBook();
myPhoneBook.initApp();
