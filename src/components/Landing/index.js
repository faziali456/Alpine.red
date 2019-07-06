import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ResponsiveImage, ResponsiveImageSize } from 'react-responsive-image';

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
      <ResponsiveImage className="responsive-image">
        <ResponsiveImageSize
          default
          minWidth={0}
          path={'/asset/images/Mobile.jpg'}
        />
        <ResponsiveImageSize
          minWidth={768}
          path={'/asset/images/Mobile.jpg'}
        />
        <ResponsiveImageSize
          minWidth={1100}
          path={'/asset/images/Desktop.jpg'}
        />
    </ResponsiveImage>
    </div>
  );
};

export default Component;
