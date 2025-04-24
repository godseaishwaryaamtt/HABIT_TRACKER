import React from "react";
import { useNavigate } from "react-router-dom";

const ReadyScreen = () => {
  const navigate = useNavigate();

  const handleYesClick = () => {
    navigate("/select");
  };

  return (
    <div className="w-screen h-screen bg-cover bg-center flex flex-col justify-up items-center text-white"
         style={{ backgroundImage: "url('/ready_bg.jpg')" }}>
       <div className="absolute bottom-[100px] left-1/2 transform -translate-x-1/3">
    <button
      onClick={handleYesClick}
      className="bg-white/1  px-20 py-12 text-xl rounded-lg hover:bg-white/1 transition"
    >
      
    </button>
  </div>
</div>
  );
};
export default ReadyScreen;