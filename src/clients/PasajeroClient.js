import axios from "axios";

const URL = 'http://localhost:8081/vuelo/api/v1.0/pasajero';

const listarTodos = async () => {
    const Token = getToken();
    const respuesta = await axios.get(`${URL}`, { headers: { Authorization: `Bearer ${Token}` } });
    console.log('Datos: ', respuesta.data);
    return respuesta.data;
}

export const listarTodosFachada = async () => {
    return await listarTodos();
}

const getToken = () => {
    return localStorage.getItem('token');
}