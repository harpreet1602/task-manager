import React from "react";
import { Link } from "react-router-dom";
const CheckEmail = () => {
  return (
    <div>
      <div className="unAuthorized">
        <h1 className="unAuthHeading" style={{marginTop:"30vh"}}>Check Your Email for verification</h1>
        <p>
          <Link to="/login" className="fw-bold text-body">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckEmail;
