"use client";

import TextCard from "@/components/Cards/TextCard";
import convertor from "@/lib/convertor";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Camera } from "react-camera-pro";
import { BsImageFill } from "react-icons/bs";


const Home = () => {
  const [processing, setProcessing] = useState(false);
  const initialRef = null;
  const camera = useRef(initialRef);
  const [image, setImage] = useState(null);
  const [texts, setTexts] = useState([]);
  const imageInputRef = useRef(null);
  const openBrowseImage = async () => {
    await imageInputRef.current.click();
  };

  const convert = async (url) => {
    if (url.length) {
      setProcessing(true);
      await convertor(url).then((txt) => {
        console.log({txt})
        let copyTexts = [];
        copyTexts.push(txt);
        setTexts(copyTexts);
      });
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (image) {
      convert(image);
    }
  }, [image]);

  return (
    <div className="min-h-[90vh]">
      
      <h1 className="text-white text-4xl md:text-6xl text-center px-5 pt-5 font-[800] ">
       Result: {' '}
        <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          {texts.map((t, i) => {
            return <Fragment key={i}>
              {t}
            </Fragment>
          })}
        </span>
      </h1>


      <button 
      className="bg-white px-5 py-2 text-black rounded-md font-[800] text-sm md:text-base flex items-center md:gap-1"
          onClick={() => {
            if (camera.current !== null) {
              setImage(camera.current.takePhoto());
            }
          }}
        >Take photo</button>

      <div className="text-white my-10">
        <Camera
          ref={camera} 
          aspectRatio={16 / 9}
          facingMode='environment'
        />
      </div>

    </div>
  );
};

export default Home;
