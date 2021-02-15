import { useState, useRef, useCallback } from "react";
import { Video } from "./Components";
import "./App.css";
import useVideoLoad from "./useVideoLoad";

function App() {
  const [pageNumber, setPageNumber] = useState(0);

  const { videos } = useVideoLoad(pageNumber);

  const ScrollContainerRef = useRef(null);
  const observer = useRef();
  const lastVideoElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && pageNumber < 1) {
        setPageNumber((prevState) => prevState + 1);
      }
    });

    if (node) observer.current.observe(node);
  });

  return (
    <div className="container">
      <div ref={ScrollContainerRef} className="videoContainer">
        {videos.length > 0 &&
          videos.map((item, index) => {
            if (videos.length === index + 1) {
              return (
                <Video
                  ref={lastVideoElementRef}
                  url={item.playbackUrl}
                  key={index}
                />
              );
            } else {
              return <Video url={item.playbackUrl} key={index} />;
            }
          })}
      </div>
    </div>
  );
}

export default App;
