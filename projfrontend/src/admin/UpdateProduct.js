import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { getAllCategories, getaProduct, updateProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateProduct = ({match}) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
    category
  } = values;

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

  const successMsg = () => {
    return (
      <div className="row">
        <div className="">
          <div
            className="alert alert-success"
            style={{ display: createdProduct ? "" : "none" }}
          >
            {createdProduct} updated successfully!
          </div>
        </div>
      </div>
    );
  };

  const preLoad = (productId) => {
    getaProduct(productId).then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data?.error });
      } else {
        preloadCategories();
        setValues({
            ...values,
            name: data.name,
            description: data.description, 
            price: data.price,
            category: data.category._id,
            stock: data.stock,
            formData: new FormData()
        });
        // console.log(categories);

      }
    });
  };

  const preloadCategories = () => {
      getAllCategories().then(data=>{
        if (data?.error) {
            setValues({ ...values, error: data?.error });
        } else {
            setValues({
                categories: data,
                formData: new FormData()
            })
        }
      })
  }

  useEffect(() => {
    preLoad(match.params.productId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateProduct(match.params.productId, user._id, token, formData).then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          price: "",
          description: "",
          stock: "",
          photo: "",
          loading: false,
          createdProduct: data.name,
          getaRedirect: true,
        });
      }
    });
    setTimeout(() => {
      // console.log(getaRedirect);
      performRedirect();
    }, 3000);
  };
  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-info">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
          value={category}
        >
          <option>Select</option>
          {categories &&
            categories.map((cat, index) => {
              return (
                <option key={index} value={cat._id}>
                  {cat.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button type="submit" onClick={onSubmit} className="btn btn-outline-info">
        Update Product
      </button>
    </form>
  );

  const goBack = () => (
    <div className="" style={{ position: "absolute" }}>
      <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
        {" "}
        Admin Home{" "}
      </Link>
    </div>
  );

  const performRedirect = () => {
    console.log(getaRedirect);

    if (getaRedirect) {
      console.log("Booozee");
      return (window.location.href = "/admin/dashboard");
      // return <Redirect to="/admin/dashboard" />;
    }
  };

  return (
    <Base
      title="Edit your Products Here"
      description="you can edit products here"
      className=""
    >
      {goBack()}
      <div className="row middle-box bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMsg()}
          {errorMsg()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
