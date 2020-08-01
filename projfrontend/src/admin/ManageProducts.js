import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const ManageProducts = () => {
  const [values, setValues] = useState({
    products: [],
    error: "",
    success: false,
    deleteSuccess: false,
    editSuccess: false,
  });

  const { products, error, success, deleteSuccess, editSuccess } = values;
  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, products: data, success: true, errror: "" });
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((res) => {
      if (res.error) {
        setValues({ ...values, error: res.error });
      } else {
        loadProducts();
        // setValues({ deleteSuccess: true });
      }
    });
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

  const successMsg = () => {
    return (
      <div className="row">
        <div className="">
          <div
            className="alert alert-success"
            style={{ display: deleteSuccess ? "" : "none" }}
          >
            Product Deleted!
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-black my-3">Total Products</h2>
          {successMsg()}
        {errorMsg()}
          {products.map((product, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-black text-left">{product.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteThisProduct(product._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
