const { ServicioCatalogo, ErrorValidacion } = require("./servicioCatalogo");

class ServicioLibros extends ServicioCatalogo {
  constructor() {
    super("Libro", ["titulo", "anioPublicacion", "autor", "genero", "estante"], ["descripcion", "isbn", "saga"]);
  }

  async listar(filtros = {}) {
    const consulta = this.repositorio().createQueryBuilder("libro")
      .leftJoinAndSelect("libro.autor", "autor")
      .leftJoinAndSelect("libro.genero", "genero")
      .leftJoinAndSelect("libro.saga", "saga")
      .leftJoinAndSelect("libro.estante", "estante");
    for (const campo of ["genero", "autor"]) {
      if (filtros[campo]) {
        const id = Number(filtros[campo]);
        if (!Number.isInteger(id) || id < 1) {
          throw new ErrorValidacion(`El filtro "${campo}" debe ser un identificador válido.`);
        }
        consulta.andWhere(`${campo}.id = :${campo}`, { [campo]: id });
      }
    }
    if (filtros.anio) {
      const anio = Number(filtros.anio);
      if (!Number.isInteger(anio) || anio < 0) throw new ErrorValidacion("El año debe ser un número entero válido.");
      consulta.andWhere("libro.anioPublicacion = :anio", { anio });
    }
    return consulta.orderBy("libro.titulo", "ASC").getMany();
  }

  async obtener(id) {
    const libro = await this.repositorio().findOne({
      where: { id: Number(id) },
      relations: { autor: true, genero: true, saga: true, estante: true },
    });
    if (!libro) {
      const { ErrorNoEncontrado } = require("./servicioCatalogo");
      throw new ErrorNoEncontrado("Libro no encontrado.");
    }
    return libro;
  }

  validar(datos, parcial) {
    super.validar(datos, parcial);
    if (Object.hasOwn(datos, "anioPublicacion")) {
      const anio = Number(datos.anioPublicacion);
      if (!Number.isInteger(anio) || anio < 0 || anio > new Date().getFullYear() + 1) {
        throw new ErrorValidacion("El año de publicación debe ser un año válido.");
      }
      datos.anioPublicacion = anio;
    }
  }
}

module.exports = new ServicioLibros();
