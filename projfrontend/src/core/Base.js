import React from "react";
import Navbar from "./Navbar";

const Base = ({
  title = "My Title",
  description = "my description",
  className = "text-black p-4",
  children,
}) => {
  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="heading-box text-black text-center px-1 py-1 fit ">
          <h2 className="display-4 ">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer mt-auto py-3">
        <div className="container-fluid bg-green text-black text-center py-3">
          <h4>If you have any questions, feel free to ask!</h4>
          <button className="btn btn-warning btn-lg ">Contact Us</button>
        </div>
        <div className="text-center text-black bg-light">IndiaVesture.com</div>
      </footer>
    </div>
  );
};

export default Base;
