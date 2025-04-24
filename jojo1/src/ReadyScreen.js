import React from "react";
import { useNavigate } from "react-router-dom";

const ReadyScreen = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/select"); // 👈 This is the line you asked about
  };

  return (
    <div className="screen ready-bg">
      <h1 className="overlay-text">Are you ready?</h1>
      <button className="button" onClick={handleStart}>
        Start
      </button>
    </div>
  );
};

export default ReadyScreen;
