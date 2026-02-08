import axios from "axios";

const URL = 'http://localhost:8082/auth/token';

const obtenertoken = async (user, password) => {
    const data = await axios.get(`${URL}?user=${user}&password=${password}`).then(r => r.data);
    const token = data.accessToken;
    console.log('Token: ', token);
    return token;
}

export const obtenertokenFachada = async (user, password) => {
    return await obtenertoken(user, password);
}

