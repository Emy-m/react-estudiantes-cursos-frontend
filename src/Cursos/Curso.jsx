import React, { Component } from "react";

export default class Curso extends Component {
  render() {
    const { curso, index } = this.props;
    return (
      <tr>
        <td>{index}</td>
        <td>{curso.nombre}</td>
        <td>{curso.horas}</td>
      </tr>
    );
  }
}
