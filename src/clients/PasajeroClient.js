import axios from "axios";

const URL = 'http://localhost:8081/aerolinea/api/v1.0/pasajeros';
const TOKEN = localStorage.getItem("token");

const listarTodos = async () => {
    const respuesta = await axios.get(`${URL}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
    console.log('Datos: ', respuesta.data);
    return respuesta.data;
}

const consultarPorId = async (id) => {
    const res = await axios.get(`${URL}/${id}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
    return res.data;
}

const guardar = async (body) => {
    await axios.post(`${URL}`, body,{ headers: { Authorization: `Bearer ${TOKEN}` } });
}

const actualizar = async (id, body) => {
    await axios.put(`${URL}/${id}`, body,{ headers: { Authorization: `Bearer ${TOKEN}` } });
}

const borrar = async (id) => {
    await axios.delete(`${URL}/${id}`,{ headers: { Authorization: `Bearer ${TOKEN}` } });
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