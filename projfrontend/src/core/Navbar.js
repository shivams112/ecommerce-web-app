import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { background: "#FDC006" };
  }
};

const Navbar = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-green ">
        <li className="nav-item">
          <Link
            className="nav-link text-black"
            style={currentTab(history, "/")}
            to="/"
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link text-black"
            style={currentTab(history, "/cart")}
            to="/cart"
          >
            Cart
          </Link>
        </li>
        {isAuthenticated() && (
          <li className="nav-item">
            <Link
              className="nav-link text-black"
              style={currentTab(history, "/user/dashboard")}
              to="/user/dashboard"
            >
              U. Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              className="nav-link text-black"
              style={currentTab(history, "/admin/dashboard")}
              to="/admin/dashboard"
            >
              A. Dashboard
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link text-black"
                style={currentTab(history, "/signup")}
                to="/signup"
              >
                Signup
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link text-black"
                style={currentTab(history, "/signin")}
                to="/signin"
              >
                Sign In
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <Link className="nav-link text-black">
            <span
              className=""
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              Signout
            </span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Navbar);
