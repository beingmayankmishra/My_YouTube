import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEO_API } from "../constants";
import VideoCard from "./VideoCard";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const data = await fetch(YOUTUBE_VIDEO_API);
      const json = await data.json();
      console.log(json.items); // Confirm the API response structure
      setVideos(json.items); // Update state with fetched video items
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {videos.length > 0 ? (
        videos.map((video, index) => (
          <VideoCard key={index} info={video} />
        ))
      ) : (
        <p>Loading videos...</p>
      )}
    </div>
  );
};

export default VideoContainer;
