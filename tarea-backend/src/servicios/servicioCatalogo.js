const { CAMPOS_RELACIONADOS } = require("../configuracion/constantes");

class ErrorValidacion extends Error {
  constructor(mensaje) {
    super(mensaje);
    this.name = "ErrorValidacion";
    this.estado = 400;
  }
}

class ErrorNoEncontrado extends Error {
  constructor(mensaje) {
    super(mensaje);
    this.name = "ErrorNoEncontrado";
    this.estado = 404;
  }
}

class ServicioCatalogo {
  constructor(nombreEntidad, camposRequeridos, camposOpcionales = []) {
    this.nombreEntidad = nombreEntidad;
    this.camposRequeridos = camposRequeridos;
    this.camposOpcionales = camposOpcionales;
  }

  repositorio() {
    return require("../configuracion/baseDatos").getRepository(this.nombreEntidad);
  }

  async listar(filtros = {}) {
    const opciones = {};
    for (const campo of this.camposRequeridos) {
      if (filtros[campo]) opciones[campo] = filtros[campo];
    }
    return this.repositorio().find({
      where: opciones,
      order: { id: "ASC" },
    });
  }

  async obtener(id) {
    const registro = await this.repositorio().findOneBy({ id: Number(id) });
    if (!registro) throw new ErrorNoEncontrado(`${this.nombreEntidad} no encontrado.`);
    return registro;
  }

  async crear(datos) {
    this.validar(datos, false);
    const entidad = this.repositorio().create(this.sanitizar(datos));
    return this.repositorio().save(entidad);
  }

  async actualizar(id, datos) {
    const entidad = await this.obtener(id);
    this.validar(datos, true);
    this.repositorio().merge(entidad, this.sanitizar(datos));
    return this.repositorio().save(entidad);
  }

  async eliminar(id) {
    const entidad = await this.obtener(id);
    await this.repositorio().remove(entidad);
  }

  validar(datos, parcial) {
    if (!datos || typeof datos !== "object" || Array.isArray(datos)) {
      throw new ErrorValidacion("El cuerpo de la solicitud debe ser un objeto.");
    }
    const camposPermitidos = [...this.camposRequeridos, ...this.camposOpcionales];
    for (const campo of camposPermitidos) {
      if (!parcial || Object.hasOwn(datos, campo)) {
        const valor = datos[campo];
        if (this.camposRequeridos.includes(campo) && (valor === undefined || valor === null || valor === "")) {
          throw new ErrorValidacion(`El campo "${campo}" es obligatorio.`);
        }
        if (typeof valor === "string" && valor.trim().length === 0 && this.camposRequeridos.includes(campo)) {
          throw new ErrorValidacion(`El campo "${campo}" no puede estar vacío.`);
        }
      }
    }
    for (const campo of Object.keys(datos)) {
      if (!camposPermitidos.includes(campo)) {
        throw new ErrorValidacion(`El campo "${campo}" no está permitido.`);
      }
    }
  }

  sanitizar(datos) {
    const limpio = {};
    for (const campo of [...this.camposRequeridos, ...this.camposOpcionales]) {
      if (Object.hasOwn(datos, campo)) limpio[campo] = datos[campo];
    }
    if (this.nombreEntidad === "Libro") {
      for (const campo of Object.keys(CAMPOS_RELACIONADOS)) {
        if (Object.hasOwn(limpio, campo)) {
          const valor = limpio[campo];
          if (campo === "saga" && (valor === "" || valor === null)) limpio[campo] = null;
          else {
            const id = Number(valor && typeof valor === "object" ? valor.id : valor);
            if (!Number.isInteger(id) || id < 1) {
              throw new ErrorValidacion(`La relación "${campo}" debe incluir un identificador válido.`);
            }
            limpio[campo] = { id };
          }
        }
      }
    }
    return limpio;
  }
}

module.exports = { ServicioCatalogo, ErrorValidacion, ErrorNoEncontrado };
