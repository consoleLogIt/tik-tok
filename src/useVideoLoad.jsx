import { useEffect, useState } from "react";
import axios from "axios";

function useVideoLoad(pageNumber) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const load = async () => {
      const {
        data,
      } = await axios.post(
        "https://europe-west1-boom-dev-7ad08.cloudfunctions.net/videoFeed",
        { page: pageNumber }
      );

      setVideos((prevState) => [...prevState, ...data]);
    };

    load();
  }, [pageNumber]);

  return { videos };
}

export default useVideoLoad;
