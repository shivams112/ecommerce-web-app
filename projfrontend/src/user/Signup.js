import React, { useState } from "react";
import Base from "../core/Base";
import logo from "./log.png";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper/index";

const Signup = () => {
  const SignUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6">
          <img src={logo} alt="" height="400" width="600" />
        </div>
        <div className="col-md-6">
          <form>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                onChange={handleChange("name")}
                value={name}
                required
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={handleChange("email")}
                value={email}
                required
              />
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={handleChange("password")}
                value={password}
                required
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" for="exampleCheck1">
                Check me out
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-success btn-block bg-green text-black"
              onClick={onSubmit}
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    );
  };

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in Signup"));
  };

  const successMsg = () => {
    return (
      <div className="row">
        <div className="col-md-6"></div>
        <div className="col-md-6">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            You are successfully registered! Please{" "}
            <Link to="/signin"> Login here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMsg = () => {
    return (
      <div className="row">
        <div className="col-md-6"></div>
        <div className="col-md-6">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="" description="">
      {successMsg()}
      {errorMsg()}
      {SignUpForm()}
      <p className="text-black text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
