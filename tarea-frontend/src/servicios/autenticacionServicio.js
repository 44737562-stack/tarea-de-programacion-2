import clienteAxios from "./clienteAxios";
import { ENDPOINTS } from "../constantes/api";

export async function iniciarSesion(datos) {
  const respuesta = await clienteAxios.post(ENDPOINTS.LOGIN, datos);
  return respuesta.data.datos;
}
