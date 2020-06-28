import React, {} from 'react';
import Base from '../core/Base';
import logo from "./log.png";


const SignInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6">
          <img src={logo} alt="" height="400" width="600" />
        </div>
        <div className="col-md-6">
          <form>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
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
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  };

const Signin = () => {
    return (
        <Base title="Sign in page" description="">
        {SignInForm()}
        </Base>
    );
}

export default Signin;
