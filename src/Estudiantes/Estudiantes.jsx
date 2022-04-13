import React, { Component } from "react";
import Estudiante from "./Estudiante";

const listaEstudiantes = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Perez",
    direccion: "Calle falsa 123",
    telefonos: ["123456789"],
    cursos: [
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
    ],
  },
  {
    id: 2,
    nombre: "Pedro",
    apellido: "Perez",
    direccion: "Calle falsa 123",
    telefonos: ["123456789"],
    cursos: [],
  },
  {
    id: 3,
    nombre: "Maria",
    apellido: "Fernandez",
    direccion: "Calle falsa 321",
    telefonos: ["321123456"],
    cursos: [],
  },
  {
    id: 4,
    nombre: "Juan",
    apellido: "Cortez",
    direccion: "Rancho 123",
    telefonos: ["546123456"],
    cursos: [
      {
        id: 5,
        nombre: "Mongo",
        duracion: "1 semana",
      },
    ],
  },
];

export default class Estudiantes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estudiantes: null,
    };
  }

  componentDidMount() {
    fetch("http://localhost:1234/estudiantes")
      .then((resp) => resp.json())
      .then((json) => {
        this.setState({
          estudiantes: json.estudiantes,
        });
      });
  }

  renderEstudiantes() {
    const { estudiantes } = this.state;
    return estudiantes.map((estudiante, index) => {
      return <Estudiante estudiante={estudiante} key={index} index={index} />;
    });
  }

  render() {
    const { estudiantes } = this.state;

    return (
      <div>
        <h3>Estudiantes</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Direccion</th>
              <th>Telefonos</th>
              <th>Cursos</th>
            </tr>
          </thead>
          <tbody>{estudiantes ? this.renderEstudiantes() : null}</tbody>
        </table>
      </div>
    );
  }
}
