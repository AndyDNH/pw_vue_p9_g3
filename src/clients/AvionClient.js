import axios from "axios";


const URL = "http://localhost:8081/aerolinea/api/v1.0/aviones";
const getToken = () => localStorage.getItem("token");

const consultarTodos = async () => {
  const res = await axios.get(URL, {
    headers: { Authorization: "Bearer " + getToken() },
  });
  return res.data;
};

const consultarPorId = async (id) => {
  const res = await axios.get(URL + "/" + id, {
    headers: { Authorization: "Bearer " + getToken() },
  });
  return res.data;
};

const guardar = async (body) => {
  await axios.post(URL, body, {
    headers: { Authorization: "Bearer " + getToken() },
  });
};

const actualizar = async (id, body) => {
  await axios.put(URL + "/" + id, body, {
    headers: { Authorization: "Bearer " + getToken() },
  });
};

const borrar = async (id) => {
  await axios.delete(URL + "/" + id, {
    headers: { Authorization: "Bearer " + getToken() },
  });
};

const buscarPorAerolinea = async (aerolinea) => {
  const res = await axios.get(URL + "/aerolinea", {
    params: { aerolinea },
    headers: { Authorization: "Bearer " + getToken() },
  });
  return res.data;
};

// FACHADAS
export const consultarTodosFachada = async () => await consultarTodos();
export const consultarPorIdFachada = async (id) => await consultarPorId(id);
export const guardarFachada = async (body) => await guardar(body);
export const actualizarFachada = async (id, body) => await actualizar(id, body);
export const borrarFachada = async (id) => await borrar(id);
export const buscarPorAerolineaFachada = async (aerolinea) =>
  await buscarPorAerolinea(aerolinea);
