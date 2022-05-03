import React, { Component } from "react";

export default class InscribirEstudiante extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cursos: [],
      nuevosCursos: [],
    };
  }

  componentDidMount() {
    this.consultarCursos();
  }

  consultarCursos() {
    fetch("http://localhost:1234/cursos")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({
          cursos: json.cursos,
        });
      });
  }

  handleChange = (event) => {
    const { value } = event.target;
    const { nuevosCursos } = this.state;
    if (nuevosCursos.find((c) => c === value)) {
      this.setState({
        nuevosCursos: nuevosCursos.filter((c) => c !== value),
      });
    } else {
      this.setState({
        nuevosCursos: [...this.state.nuevosCursos, value],
      });
    }
  };

  render() {
    const { estudiante, cancelar, inscribir } = this.props;
    const { cursos, nuevosCursos } = this.state;

    return (
      <div>
        <h1>
          Inscribir Estudiante: {estudiante.nombre + " " + estudiante.apellido},
          en los cursos
        </h1>
        {cursos.length > 0 ? (
          <div>
            {cursos
              .filter((curso) => {
                return !estudiante.cursos.find((c) => c.id === curso.id);
              })
              .map((curso) => {
                return (
                  <div key={curso.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={nuevosCursos.find((c) => c === curso.id)}
                        value={curso.id}
                        onChange={this.handleChange}
                      />
                      {curso.nombre}
                    </label>
                  </div>
                );
              })}
            <button
              disabled={nuevosCursos.length === 0}
              onClick={() => {
                inscribir(estudiante, nuevosCursos);
              }}
            >
              Inscribir
            </button>
          </div>
        ) : (
          <div>No hay mas cursos para agregar.</div>
        )}
        <button onClick={cancelar}>Cancelar</button>
      </div>
    );
  }
}
