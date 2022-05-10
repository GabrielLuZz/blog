import { PostHandler } from "../handlers/PostHandler.js";
import { UserHandler } from "../handlers/UserHandler.js";
import { User } from "../models/User.js";

const usuarioLogado = await User.checarLogin();
const userId = localStorage.getItem('userId')
const token = localStorage.getItem('token')
const botaoCriarPost = document.querySelector('.makePost form button');
const botaoLogout = document.querySelector('header button');

if (!usuarioLogado) {
    window.location.href = './src/pages/login.html'
}



UserHandler.preencherPerfil(usuarioLogado);
botaoLogout.addEventListener('click', () => {
    localStorage.clear()
    location.reload()
})
PostHandler.mostrarTodosPosts(token, userId)
botaoCriarPost.addEventListener('click', (e) => {
    e.preventDefault();
    PostHandler.criarPost(token, userId)
})