import axios from "axios";
import { CLAVES_STORAGE, EVENTOS_APLICACION } from "../constantes/api";

const clienteAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: { "Content-Type": "application/json" },
});

clienteAxios.interceptors.request.use((configuracion) => {
  const token = localStorage.getItem(CLAVES_STORAGE.TOKEN);
  if (token) configuracion.headers.Authorization = `Bearer ${token}`;
  return configuracion;
});

clienteAxios.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    if (error.response?.status === 401 && !error.config?.url?.endsWith("/autenticacion/login")) {
      window.dispatchEvent(new Event(EVENTOS_APLICACION.SESION_EXPIRADA));
    }
    return Promise.reject(error);
  },
);

export default clienteAxios;
