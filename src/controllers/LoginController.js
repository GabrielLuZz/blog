import { Aviso } from "../handlers/AvisoHandler.js";
import { FormHandler } from "../handlers/FormHandler.js";
import { User } from "../models/User.js";

const form = document.querySelector("form");
const formHandler = new FormHandler(form);

form.addEventListener("submit", async (e) => {
  if (formHandler.handleSubmit(e)) {
    const data = Object.fromEntries(
      new FormData(document.querySelector("form")).entries()
    );

    const response = await User.logarUsuario(data);

    Aviso.limparAvisos();
    if (!response) {
      Aviso.mostrarAviso("Email e/ou senha incorretos");
    } else {
      Aviso.mostrarAviso(`Login feito com sucesso!`);
      const botaoLogar = document
        .querySelector("form button")
        .setAttribute("disabled", "disabled");
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.userId);
      setTimeout(() => {
        window.location.href = "/index.html";
      }, 2000);
    }
  }
});
