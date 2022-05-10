export class UserHandler {
    static preencherPerfil(usuarioLogado) {
        const imagemPerfil = document.getElementById('imagemPerfil');
        const nomePerfil = document.getElementById('nomePerfil');

        imagemPerfil.src = usuarioLogado.avatarUrl;
        nomePerfil.innerText = usuarioLogado.username;
    }
}