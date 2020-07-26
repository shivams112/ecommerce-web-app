import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#4f8a8b", "font-weight": "bold" };
  }
};

const Navbar = ({ history }) => {
  return (
    <div>
      <ul className="nav">
      <li className="nav-item p-3 mx-5 bg-white">
        <h2 className="font-weight-bold">IndiaVesture.com</h2>
        </li>
        <Fragment className="">
        <li className="nav-item px-3 ">
          <Link
            className="nav-link text-black"
            style={currentTab(history, "/")}
            to="/"
          >
            Home
          </Link>
        </li>
        <li className="nav-item px-3">
          <Link
            className="nav-link text-black"
            style={currentTab(history, "/cart")}
            to="/cart"
          >
            Cart
          </Link>
        </li>
        {isAuthenticated() && (
          <li className="nav-item px-3">
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
          <li className="nav-item px-3">
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
            <li className="nav-item px-3">
              <Link
                className="nav-link text-black"
                style={currentTab(history, "/signup")}
                to="/signup"
              >
                Signup
              </Link>
            </li>

            <li className="nav-item px-3">
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
          <li className="nav-item px-3">
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
        </Fragment>
      </ul>
    </div>
  );
};

export default withRouter(Navbar);
