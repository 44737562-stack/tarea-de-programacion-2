export const RUTAS = {
  LOGIN: "/login",
  LIBROS: "/libros",
  NUEVO_LIBRO: "/libros/nuevo",
  DETALLE_LIBRO: (id = ":id") => `/libros/${id}`,
  EDITAR_LIBRO: (id = ":id") => `/libros/${id}/editar`,
  CATALOGO: (tipo = ":tipo") => `/catalogos/${tipo}`,
  EVENTOS: "/eventos",
};

export const TIPOS_CATALOGO = {
  autores: { nombre: "Autores", singular: "Autor" },
  generos: { nombre: "Géneros", singular: "Género" },
  sagas: { nombre: "Sagas", singular: "Saga" },
  estantes: { nombre: "Estantes", singular: "Estante" },
};

export const CAMPOS_CATALOGO = {
  autores: [
    { nombre: "nombre", etiqueta: "Nombre", tipo: "texto" },
    { nombre: "apellido", etiqueta: "Apellido", tipo: "texto" },
  ],
  generos: [{ nombre: "nombre", etiqueta: "Nombre", tipo: "texto" }],
  sagas: [
    { nombre: "nombre", etiqueta: "Nombre", tipo: "texto" },
    { nombre: "descripcion", etiqueta: "Descripción", tipo: "area", opcional: true },
  ],
  estantes: [
    { nombre: "codigo", etiqueta: "Código", tipo: "texto" },
    { nombre: "ubicacion", etiqueta: "Ubicación", tipo: "texto" },
  ],
};

export const OPCIONES_FILTRO = [
  { campo: "genero", etiqueta: "Género" },
  { campo: "autor", etiqueta: "Autor" },
  { campo: "anio", etiqueta: "Año de publicación" },
];
