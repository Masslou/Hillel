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

    htmlToElement(html) {
        const template = document.createElement('template');
        html = html.trim();
        template.innerHTML = html;
        return template.content.firstChild;
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
        PhoneBook.form.reset();
        this.moveCursorToInput(PhoneBook.contactName)
    }


    onRemoveClick(event) {
        const deleteButton = event.target;
        if (deleteButton.classList.contains(PhoneBook.DELETE_BUTTON_CLASS)) {
            deleteButton.parentElement.parentElement.remove();
        }
    }


    fieldsValidation() {
        const nameValidationResult = this.initialsValidation(PhoneBook.contactName);
        const surnameValidationResult = this.initialsValidation(PhoneBook.contactSurname);
        const phoneValidationResult = this.phoneValidation(PhoneBook.contactPhone);

        return nameValidationResult &&
            surnameValidationResult &&
            phoneValidationResult;
    }

    initialsValidation(user) {
        const nameRegExp = /^[a-zA-Z ]+$/;
        const isNameValid = nameRegExp.test(user.value);

        !isNameValid ? this.addClass(user, PhoneBook.ERROR_CLASS) : null;

        return isNameValid;
    }


    phoneValidation(user) {
        const phoneRegExp = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
        const isPhoneValid = phoneRegExp.test(PhoneBook.contactPhone.value);

        !isPhoneValid ? this.addClass(user, PhoneBook.ERROR_CLASS) : null;

        return isPhoneValid;
    }

    addClass(element, className) {
        element.classList.add(className);
    }

    removeClassesToAllInputs() {
        const errorFields = document.querySelectorAll(`.${PhoneBook.ERROR_CLASS}`);
        errorFields.forEach((item) => item.classList.remove(PhoneBook.ERROR_CLASS))
    }

    moveCursorToInput(element) {
        element.focus();
    }
}

const myPhoneBook = new PhoneBook();
myPhoneBook.initApp();
