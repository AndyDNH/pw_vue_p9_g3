import axios from "axios";

const URL = 'http://localhost:8081/vuelo/api/v1.0/pasajero';

const listarTodos = async () => {
    const Token = getToken();
    const respuesta = await axios.get(`${URL}`, { headers: { Authorization: `Bearer ${Token}` } });
    console.log('Datos: ', respuesta.data);
    return respuesta.data;
}

const consultarPorId = async (id) => {
    const Token = getToken();
    const res = await axios.get(`${URL}/${id}`, { headers: { Authorization: `Bearer ${Token}` } });
    return res.data;
}

const guardar = async (body) => {
    await axios.post(`${URL}`, body);
}

const actualizar = async (id, body) => {
    await axios.put(`${URL}/${id}`, body);
}

const borrar = async (id) => {
    await axios.delete(`${URL}/${id}`);
}

const getToken = () => {
    return localStorage.getItem('token');
}

export const listarTodosFachada = async () => {
    return await listarTodos();
}

export const consultarPorIdFachada = async (id) => {
    return await consultarPorId(id);
}

export const guardarFachada = async (body) => {
    return await guardar(body);
}
export const actualizarFachada = async (id, body) => {
    return await actualizar(id, body);
}
export const borrarFachada = async (id) => {
    return await borrar(id);
}