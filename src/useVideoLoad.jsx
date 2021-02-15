import { useEffect, useState } from "react";
import axios from "axios";

function useVideoLoad(pageNumber) {
  console.log(pageNumber, "pagenumber");
  const [videos, setVideos] = useState([]);

  useEffect(async () => {
    const {
      data,
    } = await axios.post(
      "https://europe-west1-boom-dev-7ad08.cloudfunctions.net/videoFeed",
      { page: pageNumber }
    );

    setVideos((prevState) => [...prevState, ...data]);
  }, [pageNumber]);

  return { videos };
}

export default useVideoLoad;
