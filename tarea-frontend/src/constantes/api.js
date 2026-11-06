export const ENDPOINTS = {
  LOGIN: "/autenticacion/login",
  LIBROS: "/libros",
  AUTORES: "/autores",
  GENEROS: "/generos",
  SAGAS: "/sagas",
  ESTANTES: "/estantes",
  EVENTOS: "/eventos",
};

export const CLAVES_STORAGE = {
  TOKEN: "biblioteca_token",
  ADMINISTRADOR: "biblioteca_administrador",
};

export const EVENTOS_APLICACION = {
  SESION_EXPIRADA: "biblioteca:sesion-expirada",
};

export const MENSAJES = {
  ERROR_GENERAL: "No se pudo completar la operación. Intentá nuevamente.",
  ELIMINACION: "¿Seguro que querés eliminar este registro?",
  SIN_DATOS: "Todavía no hay registros para mostrar.",
};
