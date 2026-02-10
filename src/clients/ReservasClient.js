import axios from "axios";

const URL = "http://localhost:8081/reservas";

const consultarTodos = async () => {
  const res = await axios.get(URL);
  return res.data;
};

const consultarPorId = async (id) => {
  const res = await axios.get(`${URL}/${id}`);
  return res.data;
};

const guardar = async (body) => {
  await axios.post(URL, body);
};

const actualizar = async (id, body) => {
  await axios.put(`${URL}/${id}`, body);
};

const borrar = async (id) => {
  await axios.delete(`${URL}/${id}`);
};

// FACHADAS
export const consultarTodosFachada = async () => await consultarTodos();
export const consultarPorIdFachada = async (id) => await consultarPorId(id);
export const guardarFachada = async (body) => await guardar(body);
export const actualizarFachada = async (id, body) => await actualizar(id, body);
export const borrarFachada = async (id) => await borrar(id);

