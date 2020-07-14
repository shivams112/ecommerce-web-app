import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

function AddCategory() {
  const [name, setname] = useState("");
  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    seterror("");
    setname(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    seterror("");
    setsuccess(false);

    //backend request
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        seterror(data.error);
      } else {
        seterror("");
        setsuccess(true);
        setname("");
      }
    });
  };

  const successMsg = () => {
    return (
      <div className="row">
        <div className="">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Category created successfully!
          </div>
        </div>
      </div>
    );
  };

  const errorMsg = () => {
    return (
      <div className="row">
        <div className="">
          <div
            className="alert alert-danger"
            style={{
              display: error ? "" : "none",
            }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          autoFocus
          required
          placeholder="For Ex. Summer"
          value={name}
          onChange={handleChange}
        />
        <button className="btn btn-outline-info" onClick={onSubmit}>
          Create Category
        </button>
      </div>
    </form>
  );

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
        {" "}
        Admin Home{" "}
      </Link>
    </div>
  );

  return (
    <Base
      title="Create a category here"
      description="Add a new category for your Tshirts"
      className=""
    >
      <div className="row middle-box bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMsg()}
          {errorMsg()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
}

export default AddCategory;
