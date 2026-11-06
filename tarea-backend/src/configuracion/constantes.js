const RUTAS_API = {
  AUTENTICACION: "/api/autenticacion",
  LIBROS: "/api/libros",
  AUTORES: "/api/autores",
  GENEROS: "/api/generos",
  SAGAS: "/api/sagas",
  ESTANTES: "/api/estantes",
  EVENTOS: "/api/eventos",
};

const CAMPOS_RELACIONADOS = {
  autor: "autor",
  genero: "genero",
  saga: "saga",
  estante: "estante",
};

module.exports = { RUTAS_API, CAMPOS_RELACIONADOS };
