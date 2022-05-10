import { Aviso } from "../handlers/AvisoHandler.js";
import { FormHandler } from "../handlers/FormHandler.js";
import { User } from "../models/User.js";

const form = document.querySelector('form');
const formHandler = new FormHandler(form);


form.addEventListener('submit', async(e) => {
    if (formHandler.handleSubmit(e)) {
        const body = Object.fromEntries(new FormData(document.querySelector('form')).entries())

        const response = await User.cadastrarUsuario(body)

        Aviso.limparAvisos()
        if (response.message) {
            const newMessage = Aviso.tratarErros(response.message)
            Aviso.mostrarAviso(newMessage)
        } else {
            Aviso.mostrarAviso(`Usuário cadastrado com sucesso!`)
            setTimeout(() => {
                window.location.href = './login.html'
            }, 2000)
        }
    }
})