import axios from "axios";

const URL = "http://localhost:8081/aerolinea/api/v1.0/pasajeros";

const listarTodos = async () => {
  const TOKEN = localStorage.getItem("token");
  const respuesta = await axios.get(`${URL}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return respuesta.data;
};

const consultarPorId = async (id) => {
  const TOKEN = localStorage.getItem("token");
  const res = await axios.get(`${URL}/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return res.data;
};

const consultarPorCedula = async (cedula) => {
  const TOKEN = localStorage.getItem("token");
  const res = await axios.get(`${URL}/cedula/${cedula}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });

  return res.data;
};

const guardar = async (body) => {
  const TOKEN = localStorage.getItem("token");
  await axios.post(`${URL}`, body, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
};

const actualizar = async (id, body) => {
  const TOKEN = localStorage.getItem("token");
  await axios.put(`${URL}/${id}`, body, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
};

const borrar = async (id) => {
  const TOKEN = localStorage.getItem("token");
  await axios.delete(`${URL}/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
};

export const listarTodosFachada = async () => {
  return await listarTodos();
};

export const consultarPorIdFachada = async (id) => {
  return await consultarPorId(id);
};

export const consultarPorCedulaFachada = async (cedula) => {
  return await consultarPorCedula(cedula);
};

export const guardarFachada = async (body) => {
  return await guardar(body);
};
export const actualizarFachada = async (id, body) => {
  return await actualizar(id, body);
};
export const borrarFachada = async (id) => {
  return await borrar(id);
};
//cedula
export const buscarPorCedulaFachada = async (cedula) => {
  return await buscarPorCedula(cedula);
};
