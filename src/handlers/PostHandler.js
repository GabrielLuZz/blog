import { Post } from "../models/Post.js";
import { Aviso } from "./AvisoHandler.js";

export class PostHandler {
    static async mostrarTodosPosts(token, userId, page = 1) {
        const areaPosts = document.querySelector('.areaPosts');
        areaPosts.setAttribute('data-page', page)
        areaPosts.innerHTML = '';

        if (document.querySelector('.paginacao')) {
            document.querySelector('.paginacao').remove()
        }



        const { data: posts, lastPage } = await Post.listarPosts(token, page)

        posts.sort((a, b) => a.owner.id === userId ? -1 : 0)

        if (posts) {
            posts.forEach(post => {
                const postNode = document.querySelector('#modelos .post').cloneNode(true);

                postNode.setAttribute('data-id', post.id)
                postNode.querySelector('.areaPicture img').src = post.owner.avatarUrl;
                postNode.querySelector('.areaInfo h2').innerText = post.owner.username;
                postNode.querySelector('.areaInfo p').innerText = post.post;

                if (userId !== post.owner.id) {
                    postNode.querySelector('.editar').remove();
                    postNode.querySelector('.apagar').remove();
                } else {
                    postNode.querySelector('.editar').addEventListener('click', () => {
                        PostHandler.editarPost(post.id, token, userId)
                    });
                    postNode.querySelector('.apagar').addEventListener('click', () => {
                        PostHandler.confirmarAcao(post.id, token, userId)
                    });;
                }

                postNode.querySelector('.data').innerHTML = post.updatedAt ? `${post.updatedAt.split('T')[0].split('-').reverse().join('/')} <sup>Edited</sup>` : post.createdAt.split('-').reverse().join('/');

                areaPosts.appendChild(postNode);
            });

            const paginacao = document.createElement('section');
            paginacao.classList.add('paginacao')

            for (let i = 1; i <= lastPage; i++) {
                const pagina = document.createElement('div');
                const span = document.createElement('span');

                pagina.classList.add('pagina');

                span.innerText = i;

                pagina.appendChild(span)

                pagina.addEventListener('click', () => {
                    PostHandler.mostrarTodosPosts(token, userId, i)
                    document.querySelector('.makePost form textarea').value = '';
                    Aviso.limparAvisos()
                })

                paginacao.appendChild(pagina)
            }

            document.querySelector('main').appendChild(paginacao)
        }

    }

    static async criarPost(token, userId) {

        const textarea = document.querySelector('.makePost form textarea');
        const page = document.querySelector('.areaPosts').getAttribute('data-page');
        const content = textarea.value;
        textarea.innerText = '';
        Aviso.limparAvisos()
        if (content.length > 0) {
            const usuarioCriado = await Post.criarPost(content, token);

            if (usuarioCriado) {
                textarea.value = '';
                await PostHandler.mostrarTodosPosts(token, userId, page)
                Aviso.mostrarAviso('Post criado com sucesso!', 'src/images/atencao.png')
            } else {
                Aviso.mostrarAviso('Falha ao tentar criar um Post :(', 'src/images/atencao.png')
            }

        } else {
            Aviso.mostrarAviso('Digite uma mensagem', 'src/images/atencao.png')
        }

    }

    static async editarPost(id, token) {

        const areaInfo = document.querySelector(`.post[data-id="${id}"] .areaInfo`);
        const textarea = document.createElement('textarea');
        const paragrafo = document.querySelector(`.post[data-id="${id}"] .areaInfo p`);
        const areaBotoes = document.querySelector('#modelos .botaoArea').cloneNode(true);

        textarea.value = paragrafo.innerText;

        areaBotoes.querySelector('.botaoCancelar').addEventListener('click', () => {
            PostHandler.cancelarEditar(id, paragrafo.innerText)
        });
        areaBotoes.querySelector('.botaoEditar').addEventListener('click', () => {
            PostHandler.salvarEditar(id, token, paragrafo.innerText)
        });

        paragrafo.remove()

        areaInfo.appendChild(textarea)
        areaInfo.appendChild(areaBotoes)

        textarea.focus();


    }

    static confirmarAcao(id, token, userId) {
        const modal = document.querySelector('#modelos .modalFundo').cloneNode(true);
        const main = document.querySelector('main');
        modal.querySelector('.cancelarBotao').addEventListener('click', () => {
            PostHandler.cancelarApagar(modal)
        })
        modal.querySelector('.excluirBotao').addEventListener('click', () => {
            PostHandler.excluirPost(id, token, modal, userId)
        })

        document.body.insertBefore(modal, main)

        setTimeout(() => {
            modal.classList.add('aparecer')
        }, 0)
    }

    static cancelarApagar(modal) {
        modal.classList.remove('aparecer')

        setTimeout(() => {
            modal.remove()
        }, 300)
    }

    static async excluirPost(id, token, modal, userId) {

        const response = await Post.excluirPost(id, token)

        Aviso.limparAvisos()
        if (response) {
            Aviso.mostrarAviso("Post Deletado com sucesso!", 'src/images/atencao.png')
            const page = document.querySelector('.areaPosts').getAttribute('data-page');
            modal.classList.remove('aparecer')

            setTimeout(() => {
                modal.remove()
            }, 10)

            PostHandler.mostrarTodosPosts(token, userId, page)
        } else {
            Aviso.mostrarAviso("Erro ao tentar deletar post!", 'src/images/atencao.png')
        }




    }

    static cancelarEditar(id, content) {
        const areaInfo = document.querySelector(`.post[data-id="${id}"] .areaInfo`);
        const textarea = document.querySelector(`.post[data-id="${id}"] .areaInfo textarea`);
        const paragrafo = document.createElement('p');
        const areaBotoes = document.querySelector(`.post[data-id="${id}"] .areaInfo .botaoArea`);

        paragrafo.innerText = content;

        textarea.remove()
        areaBotoes.remove()

        areaInfo.appendChild(paragrafo)
    }

    static async salvarEditar(id, token, oldContent) {
        const newContent = document.querySelector(`.post[data-id="${id}"] .areaInfo textarea`).value;
        if (newContent.trim().toLowerCase() !== oldContent.trim().toLowerCase()) {
            const areaInfo = document.querySelector(`.post[data-id="${id}"] .areaInfo`);
            const textarea = document.querySelector(`.post[data-id="${id}"] .areaInfo textarea`);
            const areaBotoes = document.querySelector(`.post[data-id="${id}"] .areaInfo .botaoArea`);
            const paragrafo = document.createElement('p');

            const response = await Post.editarPost(id, newContent, token);

            Aviso.limparAvisos()
            if (response) {
                Aviso.mostrarAviso("Usuário editado com sucesso!", 'src/images/atencao.png')
                const data = document.querySelector(`.post[data-id="${id}"] .areaActions .data`);
                paragrafo.innerText = newContent;
                data.innerHTML = `${response.updatedAt.split('T')[0].split('-').reverse().join('/')} <sup>Edited</sup>`

            } else {
                Aviso.mostrarAviso("Erro ao tentar editar usuário", 'src/images/atencao.png')
                paragrafo.innerText = oldContent;
            }

            textarea.remove()
            areaBotoes.remove()
            areaInfo.appendChild(paragrafo)

        }
    }
}