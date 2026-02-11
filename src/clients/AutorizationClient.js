import axios from "axios";

const URL = 'http://localhost:8082/auth/token';

const obtenertoken = async (user, password) => {
    const response = await axios.get(`${URL}?user=${user}&password=${password}`);
    const data = response.data;
    const token = data.accessToken;
    localStorage.setItem("token", token);
    return token;

}

export const obtenertokenFachada = async (user, password) => {
    return await obtenertoken(user, password);
}

