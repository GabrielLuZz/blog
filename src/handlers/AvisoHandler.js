class AvisoHandler {
    static mostrarAviso(mensagem, caminhoImagem = '') {
        let avisos = document.querySelector('.avisos');

        let aviso = document.createElement('div');
        let divMensagem = document.createElement('div');
        let img = document.createElement('img');
        let info = document.createElement('span');
        let barra = document.createElement('div');

        aviso.classList.add('aviso');
        divMensagem.classList.add('mensagem');
        img.src = caminhoImagem ? caminhoImagem : '../images/atencao.png';
        info.innerText = mensagem;
        barra.classList.add('barra');

        divMensagem.append(img, info)

        aviso.append(divMensagem, barra);

        avisos.appendChild(aviso);

        setTimeout(() => {
            barra.style.width = '0px';
        }, 100)

        setTimeout(() => {
            aviso.style.transform = 'translate(1000px)';
            aviso.style.transition = 'all 0.4s ease-out';


        }, 6000)


        setTimeout(() => {
            aviso.remove()


        }, 7000)
    }

    static tratarErros(mensagem) {
        let newMesagem = '';

        switch (mensagem) {
            case 'duplicate key value violates unique constraint \"UQ_97672ac88f789774dd47f7c8be3\"':
                newMesagem = 'Usuário já existente'
                break;
            default:
                newMesagem = mensagem;
        }


        return newMesagem;
    }

    static limparAvisos() {
        document.querySelectorAll('.aviso').forEach((item) => {
            item.remove()
        })
    }
}

export {
    AvisoHandler as Aviso
}