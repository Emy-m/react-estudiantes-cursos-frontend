import React, { Component } from "react";
import Cursos from "../Cursos/Cursos";
import Estudiantes from "../Estudiantes/Estudiantes";

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estado: "CURSOS",
    };
  }

  cambiarEstado(estado) {
    this.setState({
      estado: estado,
    });
  }

  render() {
    const { estado } = this.state;
    const renderEstado =
      estado === "CURSOS" ? (
        <Cursos />
      ) : estado === "ESTUDIANTES" ? (
        <Estudiantes />
      ) : null;

    return (
      <div>
        <div>
          <button
            onClick={() => {
              this.cambiarEstado("ESTUDIANTES");
            }}
          >
            Estudiantes
          </button>
          <button
            onClick={() => {
              this.cambiarEstado("CURSOS");
            }}
          >
            Cursos
          </button>
        </div>
        <div>{renderEstado}</div>
      </div>
    );
  }
}
