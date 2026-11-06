require("dotenv").config();
const path = require("node:path");
const fs = require("node:fs");
const { DataSource } = require("typeorm");
const { entidades } = require("../entidades");

const rutaBaseDatos = path.resolve(
  process.cwd(),
  process.env.RUTA_BASE_DATOS || "./datos/biblioteca.sqlite",
);
fs.mkdirSync(path.dirname(rutaBaseDatos), { recursive: true });

const baseDatos = new DataSource({
  type: "sqlite",
  database: rutaBaseDatos,
  entities: entidades,
  synchronize: true,
  logging: false,
});

module.exports = baseDatos;
