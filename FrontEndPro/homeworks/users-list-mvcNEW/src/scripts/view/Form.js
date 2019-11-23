import $ from 'jquery';

export default class InfoForm{
    // static HIDDEN_CLASS = 'hidden';

    constructor(config){
        this.config = config;
        this.$formInfo = this.createForm();
        this.bindEventsListener();
    }
    bindEventsListener(){
        this.$formInfo.on('submit',this.onFormSubmit.bind(this));
        this.$formInfo.on('click','#bttn-delete',this.onDeleteBtnClick.bind(this));
    }
    onFormSubmit(e){
        e.preventDefault();

        const data = this.getFormData();
        this.config.onSubmit(data);
        this.openFormNewUser();
    }
    onDeleteBtnClick(e) {
        const id = $('#id-input').val();
        this.config.onDelete(id);
        this.openFormNewUser();

    }
    getFormData(){
        const objData = {};
        this.$formInfo.serializeArray().forEach(({name,value})=>{
            objData[name] = value;
        });
        return objData;
    }
    createForm(){
        return $(`
            <form action="#" id="add-new-user">
                <div class="user-info">
                    <div class="basic-data">
                        <p>Basic data:</p>
                        <input type="text" name="name" id="full-name" placeholder="Input full name">
                        <input type="text" name="surname" id="user-name" placeholder="Input user name">
                    </div>
                    <div class="contact-info">
                        <p>Contact info:</p>
                        <input type="email" name="email" id="email" placeholder="Input e-mail">
                        <input type="phone" name="phone" id="phone" placeholder="Input phone">
                        <div class="form-button">
                            <button type="submit" id="bttn-save">Save</button>
                            <button type="button" id="bttn-delete">Delete</button>
                        </div>
                    </div>
                    <input name = "id" type="hidden" id="id-input">
                </div>
            </form>`
        );
    }

    openFormNewUser(){
        this.resetForm();
        $('#idInput').val('');
        $('#bttn-delete').addClass('hidden')
    }
    resetForm(){
        this.$formInfo[0].reset();
    }
    showInfoUser(data){
        this.removeClass();
        this.$formInfo[0][0].value = data.name;
        this.$formInfo[0][1].value = data.surname;
        this.$formInfo[0][2].value = data.email;
        this.$formInfo[0][3].value = data.phone;
        this.$formInfo[0][6].value = data.id;
    }
    removeClass(){
        $('#bttn-delete').removeClass('hidden');
    }
}
