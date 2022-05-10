export class User {
    constructor(username, email, password, avatarUrl) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.avatarUrl = avatarUrl;
    }

    static BASE_URL = 'https://api-blog-m2.herokuapp.com/user';

    static async cadastrarUsuario(data) {
        const response = await fetch(`${this.BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then((resp) => resp.json())
            .catch((error) => error)

        return response;
    }

    static async listarUsuario(userId, token) {

        const response = await fetch(`${this.BASE_URL}/${userId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((resp) => resp.status !== 200 ? false : resp.json())
            .catch((error) => error)

        return response

    }

    static async logarUsuario(data) {
        const response = await fetch(`${this.BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then((resp) => resp.status !== 200 ? false : resp.json())
            .catch((error) => error)

        return response;
    }

    static async checarLogin() {
        const usuario = await User.listarUsuario(localStorage.getItem('userId'), localStorage.getItem('token'));
        if (usuario) {
            return usuario;
        } else {
            return false;
        }
    }
}