import React from "react";
import './Toaster.css';
import exclamation from '../../assets/images/exclamation-round-red.png';

const Toaster = (props) => {
  return (
    <div className="snackbar">
      <img src={exclamation} alt="alert" />
      <div>{props.message}</div>
    </div>
  );
};

export default Toaster;
