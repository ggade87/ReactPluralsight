import React, { Component } from "react";

class Like extends Component {
  render() {
    let clsses = "fa fa-heart";
    if (!this.props.liked) clsses += "-o";
    return (
      <i
        onClick={this.props.onClick}
        style={{ cursor: "pointer" }}
        className={clsses}
      ></i>
    );
  }
}

export default Like;
