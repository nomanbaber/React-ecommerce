import React from "react";
 
 import   "../../components/Loader/LoadingSpinner.css";

export default function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
}