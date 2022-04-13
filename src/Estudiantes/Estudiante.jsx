import React, { Component } from "react";
import Cursos from "../Cursos/Cursos";

export default class Estudiante extends Component {
  render() {
    const { estudiante, index } = this.props;
    return (
      <tr>
        <td>{index}</td>
        <td>{estudiante.nombre}</td>
        <td>{estudiante.apellido}</td>
        <td>{estudiante.direccion.direccion}</td>
        <td>{estudiante.telefonos[0].numero}</td>
        <td>
          {estudiante.cursos && estudiante.cursos.length > 0 ? (
            <Cursos estudiante={estudiante} key={index} />
          ) : (
            <div>
              <ul>
                <li>Sin Cursos</li>
              </ul>
            </div>
          )}
        </td>
      </tr>
    );
  }
}
