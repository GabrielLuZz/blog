import { Aviso } from "./AvisoHandler.js";

export class FormHandler {
    constructor(formulario) {
        this.formulario = formulario;
    }

    handleSubmit(event) {
        event.preventDefault();

        let inputs = this.formulario.querySelectorAll('input');

        let send = true;

        this.clearErrors();
        Aviso.limparAvisos();

        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = this.checkInput(input);
            if (check !== true) {
                send = false;
                this.showError(input, check);
            }
        }

        return send;
    }

    checkInput(input) {
        let rules = input.getAttribute('data-rules');

        if (rules !== null) {
            rules = rules.split('|');
            for (let k in rules) {
                let rDetails = rules[k].split('=');
                switch (rDetails[0]) {
                    case 'required':
                        if (input.value == '') {
                            return 'Campo não pode ser vazio.';
                        }
                        break;
                    case 'min':
                        if (input.value.length < rDetails[1]) {
                            return 'Campo tem que ter pelo menos ' + rDetails[1] + ' caractes';
                        }
                        break;
                    case 'email':
                        if (input.value != '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if (!regex.test(input.value.toLowerCase())) {
                                return 'E-mail digitado não é válido!';
                            }
                        }
                        break;
                }
            }
        }

        return true;
    }

    showError(input, error) {
        input.classList.add('error');

        if (input.type === 'file') {
            if (document.querySelector('#foto')) {
                document.querySelector('#foto').classList.add('error')
            }

        }


        Aviso.mostrarAviso(error);
    }

    clearErrors() {
        let inputs = this.formulario.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove('error')
        }
        if (document.querySelector('#foto')) {
            document.querySelector('#foto').classList.remove('error')
        }
    }


}