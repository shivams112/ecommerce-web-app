import React, { useState } from "react";
import Base from "../core/Base";
import logo from "./log.png";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper/index";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;

  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const loadingMsg = () => {
    return (
      loading && (
        <img
          src={"https://media.giphy.com/media/3y0oCOkdKKRi0/giphy.gif"}
          height="100"
          width="100"
        />
      )
    );
  };

  const errorMsg = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
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

  const onSubmit = (event) => {
    event.preventDefault();
    if(checkValidity())
    return 
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch(console.log("Sign in Failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />
      } else {
        return <Redirect to="/user/dashboard" />
      }
    }

    if (isAuthenticated()) return <Redirect to="/" />;
  };

  const checkValidity = () => {
    if (email === "" || password === "") {
      setValues({
        ...values,
        error: "All fields are mandatory",
        loading: false,
      });
      return true;
    }
    return false;
  };

  const SignInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={handleChange("email")}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={handleChange("password")}
                required
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                required
              />
              <label className="form-check-label">Check me out</label>
            </div>
            <button
              type="submit"
              className="btn btn-success btn-block bg-green text-black"
              onClick={onSubmit}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign In" className="middle-box bg-white text-black p-4">
      {/* {loadingMsg()} */}
      {errorMsg()}
      {SignInForm()}
      {performRedirect()}
      <p className="text-black text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
