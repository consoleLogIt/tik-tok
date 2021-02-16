import React, { useRef, useEffect, useState, forwardRef } from "react";
import "./Video.css";
import Hls from "hls.js";

function Video({ url }, ref) {
  const videoRef = useRef(null);
  const [videoStatus, setVideoStatus] = useState("playing");
  const observer = useRef();

  const handleVideoPause = () => {
    videoRef.current.pause();
    setVideoStatus("paused");
  };

  const handleVideoPlay = () => {
    videoRef.current.play();
    setVideoStatus("playing");
  };

  useEffect(() => {
    if (Hls.isSupported()) {
      var video = videoRef.current;
      var hls = new Hls();
      hls.attachMedia(video);
      hls.on(Hls.Events.MEDIA_ATTACHED, function () {});
      hls.loadSource(url);
      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {});
    }

    if (observer.current) observer.current.disconnect();
    var promisePlay;
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            promisePlay = videoRef.current.play();
            setVideoStatus("playing");
          } else {
            // handle if the video play promise is pending
            if (promisePlay) {
              promisePlay
                .then(() => {
                  videoRef.current.pause();
                  setVideoStatus("paused")
                })
                .catch((err) => console.log(err));
            }
          }
        });
      },
      { threshold: 1.0 }
    );

    if (videoRef) observer.current.observe(videoRef.current);
  }, [url]);

  return (
    <>
      <div className="video">
        <video
          className="videoElement"
          loop
          muted
          ref={videoRef}
          onClick={() =>
            videoStatus === "playing" ? handleVideoPause() : handleVideoPlay()
          }
        ></video>
        <div ref={ref} className="video-loader">
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}

const forwardedVideo = forwardRef(Video);

export default forwardedVideo;
