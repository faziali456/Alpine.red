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
    <div>
         <img className="responsive-image" src='/asset/images/BgImage.jpg'></img>
    </div>
  );
};

export default Component;
