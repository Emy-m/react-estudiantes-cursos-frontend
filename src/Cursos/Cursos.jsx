import React, { Component } from "react";
import Curso from "./Curso";

const listaCursos = [
  {
    id: 1,
    nombre: "React",
    duracion: "4 semanas",
  },
  {
    id: 2,
    nombre: "Angular",
    duracion: "2 semanas",
  },
  {
    id: 3,
    nombre: "Vue",
    duracion: "1 semana",
  },
  {
    id: 4,
    nombre: "Node",
    duracion: "2 semanas",
  },
  {
    id: 5,
    nombre: "Mongo",
    duracion: "1 semana",
  },
];

export default class Cursos extends Component {
  constructor(props) {
    super(props);
    const { estudiante } = this.props;
    this.state = {
      estudiante: estudiante,
      cursos: null,
    };
  }

  componentDidMount() {
    fetch("http://localhost:1234/cursos")
      .then((response) => {
        return response.json();
      })
      .then((cursos) => {
        this.setState({
          cursos: cursos.cursos,
        });
      });
  }

  renderCursos() {
    const { cursos } = this.state;
    return (
      <div>
        <h3>Cursos</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Duracion</th>
            </tr>
          </thead>
          <tbody>
            {cursos &&
              cursos.map((curso, index) => {
                return <Curso curso={curso} key={index} index={index} />;
              })}
          </tbody>
        </table>
      </div>
    );
  }

  renderCursosEstudiante() {
    const { estudiante } = this.state;
    return (
      <div>
        <ul>
          {estudiante.cursos.map((curso, index) => {
            return <li key={index}>{curso.nombre + " - " + curso.horas}</li>;
          })}
        </ul>
      </div>
    );
  }

  render() {
    const { estudiante } = this.state;

    return estudiante ? this.renderCursosEstudiante() : this.renderCursos();
  }
}
