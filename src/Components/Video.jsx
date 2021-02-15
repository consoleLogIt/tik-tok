import React, { useRef, useEffect, useState, forwardRef } from "react";
import "./Video.css";
import Hls from "hls.js";

function Video({ url }, ref) {
  const videoRef = useRef(null);
  // const loadingRef = useRef(null);
  const [videoStatus, setVideoStatus] = useState("pause");

  const handleVideoPause = () => {
    videoRef.current.pause();
    setVideoStatus("pause");
  };

  const handleVideoPlay = () => {
    videoRef.current.play();
    setVideoStatus("playing");
  };

  useEffect(() => {
    console.log(url, "url");
    if (Hls.isSupported()) {
      console.log(url);
      var video = videoRef.current;
      var hls = new Hls();
      hls.attachMedia(video);
      hls.on(Hls.Events.MEDIA_ATTACHED, function () {});
      hls.loadSource(url);
      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {});
    }

  
  }, [url]);

  return (
    <>
      <div className="video">
        <video
          className="videoElement"
          loop
          ref={videoRef}
          onClick={() =>
            videoStatus === "playing" ? handleVideoPause() : handleVideoPlay()
          }
        ></video>
        <div ref={ref} className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}

const forwardedVideo = forwardRef(Video);

export default forwardedVideo;
