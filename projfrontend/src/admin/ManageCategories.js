import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import {
  getAllCategories,
  deleteCategory,
  updateCategory,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import Modal from "react-bootstrap/Modal";

const ManageCategories = () => {
  const [values, setValues] = useState({
    categories: [],
    success: false,
    error: "",
    category: "",
    name: "",
    deleteError: "",
    delsuccess: false,
  });

  const [show, setShow] = useState(false);

  const handleClose = () => {
    preLoad();
    setShow(false);
  };
  const handleShow = (event) => {
    event.preventDefault();
    setShow(true);
  };

  const { categories, success, error, category, name, deleteError, delsuccess } = values;
  const { user, token } = isAuthenticated();

  const editModal = () => (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Categories</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <p className="px-3">
              {successMsg()}
              {errorMsg()}
            </p>
            <p className="lead">Enter the new category</p>
            <input
              type="text"
              className="form-control my-3"
              autoFocus
              required
              placeholder="For Ex. Summer"
              value={name}
              onChange={handleChange("name")}
            />
            <button className="btn btn-outline-info" onClick={updateButton}>
              Submit
            </button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-outline-dark" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
  const preLoad = () => {
    getAllCategories().then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data?.error });
      } else {
        setValues({ ...values, categories: data });
        // console.log(categories);
      }
    });
  };

  const successMsg = () => {
    return (
      <div className="row">
        <div className="">
          <div
            className="alert alert-success"
            style={{ display: delsuccess||success ? "" : "none" }}
          >
            Success !
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
              display: error || deleteError ? "" : "none",
            }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    preLoad();
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const delButton = (event) => {
    event.preventDefault();
    deleteCategory(category, user._id, token).then((data) => {
      // console.log("HAA", data);
      if (data.error) {
        setValues({ ...values, error: data.error});
      } else {
        // preLoad();
        setValues({
          ...values,
          error: "",
          deleteError: "",
          category: "",
          success: true,
          delsuccess: true
        });
      }
      console.log(success);
    });
  };

  const updateButton = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "" });
    updateCategory(category, user._id, token, { name }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success:false});
        console.log(error);
      } else {
        // preLoad();
        setValues({
          ...values,
          success: true,
          error: "",
        });
      }
    });
    // handleClose();
  };

  const ManageCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Select the category</p>
        <select
          onChange={handleChange("category")}
          className="form-control my-3"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cat, index) => {
              return (
                <option
                  key={index}
                  value={cat._id}
                  onChange={handleChange("category")}
                >
                  {cat.name}
                </option>
              );
            })}
        </select>
        <div className="row">
          <div className="col-md-6">
            <button className="btn btn-outline-info" onClick={delButton}>
              DELETE
            </button>
          </div>
          <div className="col-md-6">
            <button
              className="btn btn-outline-info pull-right"
              onClick={handleShow}
            >
              UPDATE
            </button>
          </div>
        </div>
      </div>
    </form>
  );
  return (
    <Base
      title="Manage your Categories"
      description="You can edit or delete categories here"
    >
      <div className="row middle-box bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {errorMsg()}
          {successMsg()}
          {ManageCategoryForm()}
          {editModal()}
          {/* {goBack()} */}
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
