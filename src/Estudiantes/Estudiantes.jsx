import React, { Component } from "react";
import Estudiante from "./Estudiante";
import CrearEstudiante from "./CrearEstudiante";
import InscribirEstudiante from "./InscribirEstudiante";

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
      estudiantes: [],
      creacion: false,
      agregar: null,
    };
  }

  componentDidMount() {
    this.consultarEstudiantes();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.estudiantes !== this.state.estudiantes) {
      this.consultarEstudiantes();
    }
  }

  handleClick = () => {
    this.setState({
      creacion: !this.state.creacion,
    });
  };

  agregarCurso = (estudiante) => {
    this.setState({
      agregar: estudiante,
    });
  };

  consultarEstudiantes = () => {
    fetch("http://localhost:1234/estudiantes")
      .then((resp) => resp.json())
      .then((json) => {
        this.setState({
          estudiantes: json.estudiantes,
        });
      });
  };

  inscribir = (estudiante, cursos) => {
    fetch("http://localhost:1234/inscribir", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apellido: estudiante.apellido,
        idCursos: cursos,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result === "success") {
          this.setState({
            agregar: null,
            estudiantes: [],
          });
        }
      });
  };

  render() {
    const { estudiantes, agregar, creacion } = this.state;
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
          <tbody>
            {estudiantes
              ? estudiantes.map((estudiante, index) => {
                  return (
                    <Estudiante
                      estudiante={estudiante}
                      key={index}
                      index={index}
                      agregarCurso={() => {
                        this.agregarCurso(estudiante);
                      }}
                    />
                  );
                })
              : null}
          </tbody>
        </table>
        <button onClick={this.handleClick}>Crear Estudiante</button>
        {creacion ? (
          <CrearEstudiante consultarEstudiantes={this.consultarEstudiantes} />
        ) : null}
        {agregar ? (
          <InscribirEstudiante
            estudiante={agregar}
            cancelar={() => {
              this.agregarCurso(null);
            }}
            inscribir={this.inscribir}
          />
        ) : null}
      </div>
    );
  }
}
