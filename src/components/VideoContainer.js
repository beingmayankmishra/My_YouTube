import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { YOUTUBE_VIDEO_API, YOUTUBE_SEARCH_API } from "../constants";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const category = useSelector((state) => state.app.category);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          category === "All" ? YOUTUBE_VIDEO_API : `${YOUTUBE_SEARCH_API}${category}`
        );
        const data = await response.json();
        setVideos(data.items);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [category]);

  if (!videos || videos.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {videos.map((video) => (
        <Link
          key={video.id.videoId || video.id}
          to={`/watch?v=${video.id.videoId || video.id}`}
          className="video-card"
        >
          <img
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            className="w-full rounded-lg"
          />
          <h3 className="font-semibold mt-2">{video.snippet.title}</h3>
          <p className="text-sm text-gray-600">{video.snippet.channelTitle}</p>
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
