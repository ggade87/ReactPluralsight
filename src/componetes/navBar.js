import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import Customers from "./customers";
import Rentals from "./rentals";
class NavBar extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/movies">
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/customers">
                Customers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/rentals">
                Rentals
              </NavLink>
            </li>
            <li className="nav-item">
              {!user && (
                <React.Fragment>
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>

                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </React.Fragment>
              )}
            </li>
            <li className="nav-item">
              {user && (
                <React.Fragment>
                  <NavLink className="nav-link" to="/profile">
                    {user.name}
                  </NavLink>
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                </React.Fragment>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
