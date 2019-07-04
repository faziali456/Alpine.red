import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

let imgUrl = '/asset/images/BgImage.jpg'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

const Component = () => {
  const { height, width } = useWindowDimensions();

  return (
    <div style={{ 
      backgroundImage: `url(${ imgUrl })`,
      backgroundRepeat  : 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      backgroungAttachment: 'fixed',
      backgroungColor: '#999',
      top: "64px",
      padding: `0 0 ${height-70}px 0`,
      }}>
    </div>
  );
};

export default Component;
