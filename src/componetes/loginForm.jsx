import React, { Component } from "react";

import Form from "./common/form";
import Joi from "joi-browser";

import auth from "../services/authService";
import { Redirect } from "react-router-dom";
class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  constructor(props) {
    super(props);
  }

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const { state } = this.props.location; //use to auto redirect the link which we clicked before login
      window.location = state ? state.from.pathname : "/";
      //this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }

    console.log("Subited");
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/"></Redirect>;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handlerSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
