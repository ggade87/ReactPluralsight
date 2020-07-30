import React from "react";
import "./App.css";
import Movies from "./componetes/Movies/movies";
import { Route, Redirect, Switch } from "react-router-dom";
import Customer from "./componetes/customers";
import Rentals from "./componetes/rentals";
import NotFound from "./componetes/notFound";
import NavBar from "./componetes/navBar";
import MovieForm from "./componetes/movieForm";
import LoginForm from "./componetes/loginForm";
import RegisterForm from "./componetes/registerForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Logout from "./componetes/logout";
import auth from "./services/authService";
import { render } from "@testing-library/react";
import ProtectedRoute from "./componetes/common/protectedRoute";
class App extends React.Component {
  state = { user: "" };
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer></ToastContainer>
        <NavBar user={user}></NavBar>
        <main role="main" className="container">
          <Switch>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <ProtectedRoute
              path="/movies/:id"
              component={MovieForm}
            ></ProtectedRoute>
            <Route
              path="/movies"
              render={(props) => (
                <Movies {...props} user={this.state.user}></Movies>
              )}
            ></Route>
            <Route path="/customers" component={Customer}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
