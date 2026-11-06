import { useCallback, useEffect, useState } from "react";
import { MENSAJES } from "../constantes/api";

export function useCarga(funcionCarga, dependencias = []) {
  const [datos, establecerDatos] = useState([]);
  const [cargando, establecerCargando] = useState(true);
  const [error, establecerError] = useState("");

  const cargar = useCallback(async () => {
    establecerCargando(true);
    establecerError("");
    try {
      establecerDatos(await funcionCarga());
    } catch (fallo) {
      establecerError(fallo.response?.data?.error?.mensaje || MENSAJES.ERROR_GENERAL);
    } finally {
      establecerCargando(false);
    }
  // funcionCarga se recrea en los consumidores; las dependencias indican cuándo recargar.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencias);

  useEffect(() => {
    cargar();
  }, [cargar]);

  return { datos, establecerDatos, cargando, error, cargar };
}
