import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const handleClick = () => {
    navigate("/loading");
  };

  useEffect(() => {
    // Try to play the video again on component mount
    if (videoRef.current) {
      videoRef.current.play().catch((e) => {
        console.warn("Video play prevented:", e);
      });
    }
  }, []);

  return (
    <div className="w-screen h-screen bg-purple" onClick={handleClick}>
      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-full h-full object-cover cursor-pointer"
      >
        <source src="/animation.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default SplashScreen;
