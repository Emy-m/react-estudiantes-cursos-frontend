import React, { Component } from "react";

export default class CrearEstudiante extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        nombre: "",
        apellido: "",
        direccion: "",
        telefono: "",
        curso: "",
      },
      cursos: [],
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { consultarEstudiantes } = this.props;

    fetch("http://localhost:1234/estudiantes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: this.state.form.nombre,
        apellido: this.state.form.apellido,
        direccion: this.state.form.direccion,
        telefonos: [this.state.form.telefono],
        cursos: [this.state.form.curso],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === "error") {
          this.setState({
            resultado: data.message,
          });
          return;
        }
        this.setState({
          resultado: "Se creo el estudiante con exito.",
        });
        consultarEstudiantes();
      });
  };

  componentDidMount() {
    fetch("http://localhost:1234/cursos")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          cursos: data.cursos,
        });
      });
  }

  render() {
    const { cursos } = this.state;

    return (
      <div>
        <h1>Crear Estudiante</h1>
        <form>
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={this.state.form.nombre}
            onChange={this.handleChange}
          />
          <label>Apellido</label>
          <input
            type="text"
            name="apellido"
            value={this.state.form.apellido}
            onChange={this.handleChange}
          />
          <label>Direccion</label>
          <input
            type="text"
            name="direccion"
            value={this.state.form.direccion}
            onChange={this.handleChange}
          />
          <label>Telefono</label>
          <input
            type="text"
            name="telefono"
            value={this.state.form.telefono}
            onChange={this.handleChange}
          />
          <label>Cursos</label>
          <select name="curso" onChange={this.handleChange}>
            <option value={null}>Selecciona un Curso</option>
            {cursos &&
              cursos.map((curso, index) => (
                <option key={index} value={curso.id}>
                  {curso.nombre}
                </option>
              ))}
          </select>
          <input type={"submit"} onClick={this.handleSubmit} value={"Enviar"} />
        </form>
        <p>{this.state.resultado}</p>
      </div>
    );
  }
}
