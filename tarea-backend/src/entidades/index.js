const { EntitySchema } = require("typeorm");

const Autor = new EntitySchema({
  name: "Autor",
  tableName: "autores",
  columns: {
    id: { type: Number, primary: true, generated: true },
    nombre: { type: String, length: 100 },
    apellido: { type: String, length: 100 },
  },
});

const Genero = new EntitySchema({
  name: "Genero",
  tableName: "generos",
  columns: {
    id: { type: Number, primary: true, generated: true },
    nombre: { type: String, length: 100, unique: true },
  },
});

const Saga = new EntitySchema({
  name: "Saga",
  tableName: "sagas",
  columns: {
    id: { type: Number, primary: true, generated: true },
    nombre: { type: String, length: 150, unique: true },
    descripcion: { type: String, nullable: true },
  },
});

const Estante = new EntitySchema({
  name: "Estante",
  tableName: "estantes",
  columns: {
    id: { type: Number, primary: true, generated: true },
    codigo: { type: String, length: 50, unique: true },
    ubicacion: { type: String, length: 150 },
  },
});

const Administrador = new EntitySchema({
  name: "Administrador",
  tableName: "administradores",
  columns: {
    id: { type: Number, primary: true, generated: true },
    correo: { type: String, length: 180, unique: true },
    claveEncriptada: { type: String },
  },
});

const Libro = new EntitySchema({
  name: "Libro",
  tableName: "libros",
  columns: {
    id: { type: Number, primary: true, generated: true },
    titulo: { type: String, length: 200 },
    anioPublicacion: { type: Number },
    descripcion: { type: String, nullable: true },
    isbn: { type: String, length: 20, nullable: true },
  },
  relations: {
    autor: { type: "many-to-one", target: "Autor", eager: true, nullable: false },
    genero: { type: "many-to-one", target: "Genero", eager: true, nullable: false },
    estante: { type: "many-to-one", target: "Estante", eager: true, nullable: false },
    saga: { type: "many-to-one", target: "Saga", eager: true, nullable: true },
  },
});

module.exports = {
  entidades: [Autor, Genero, Saga, Estante, Administrador, Libro],
};
