export class Post {
    constructor() {

    }

    static BASE_URL = 'https://api-blog-m2.herokuapp.com/post';

    static async criarPost(content, token) {
        const response = await fetch(`${this.BASE_URL}`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ content })
            })
            .then((resp) => resp.status !== 201 ? false : resp.json())
            .catch((error) => error)

        return response;
    }

    static async listarPost(id, token) {
        const response = await fetch(`${this.BASE_URL}/${id}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((resp) => resp.status !== 200 ? false : resp.json())
            .catch((error) => error)

        return response;
    }

    static async listarPosts(token, page = 1) {
        const response = await fetch(`${this.BASE_URL}?page=${page}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((resp) => resp.status !== 200 ? false : resp.json())
            .catch((error) => error)

        return response;
    }

    static async editarPost(id, newContent, token) {
        const response = await fetch(`${this.BASE_URL}/${id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ newContent })
            })
            .then((resp) => resp.status !== 200 ? false : resp.json())
            .catch((error) => error)

        return response;
    }

    static async excluirPost(id, token) {
        const response = await fetch(`${this.BASE_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((resp) => resp.status !== 204 ? false : resp.json())
            .catch((error) => error)

        return response;
    }
}