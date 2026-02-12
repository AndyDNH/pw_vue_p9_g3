import axios from "axios";

const URL = "http://localhost:8081/aerolinea/api/v1.0/aviones";

const consultarTodos = async () => {
  const TOKEN = localStorage.getItem("token");

  const res = await axios.get(URL, {
    headers: { Authorization: "Bearer " + TOKEN },
  });

  return res.data;
};

const consultarPorId = async (id) => {
  const TOKEN = localStorage.getItem("token");

  const res = await axios.get(URL + "/" + id, {
    headers: { Authorization: "Bearer " + TOKEN },
  });

  return res.data;
};

const guardar = async (body) => {
  const TOKEN = localStorage.getItem("token");

  await axios.post(URL, body, {
    headers: { Authorization: "Bearer " + TOKEN },
  });
};

const actualizar = async (id, body) => {
  const TOKEN = localStorage.getItem("token");

  await axios.put(URL + "/" + id, body, {
    headers: { Authorization: "Bearer " + TOKEN },
  });
};

const borrar = async (id) => {
  const TOKEN = localStorage.getItem("token");

  await axios.delete(URL + "/" + id, {
    headers: { Authorization: "Bearer " + TOKEN },
  });
};

const buscarPorAerolinea = async (aerolinea) => {
  const TOKEN = localStorage.getItem("token");

  const res = await axios.get(`${URL}/aerolinea/${aerolinea}`, {
    headers: { Authorization: "Bearer " + TOKEN },
  });

  return res.data;
};

// FACHADAS
export const consultarTodosFachada = async () => {
  return await consultarTodos();
};

export const consultarPorIdFachada = async (id) => {
  return await consultarPorId(id);
};

export const guardarFachada = async (body) => {
  await guardar(body);
};

export const actualizarFachada = async (id, body) => {
  await actualizar(id, body);
};

export const borrarFachada = async (id) => {
  await borrar(id);
};

export const buscarPorAerolineaFachada = async (aerolinea) => {
  return await buscarPorAerolinea(aerolinea);
};
