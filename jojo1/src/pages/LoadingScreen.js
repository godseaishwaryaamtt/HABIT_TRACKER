import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/ready");
    }, 500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-pink text-purple text-3xl">
      <h1>Loading...</h1>
    </div>
  );
};

export default LoadingScreen;