import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { GOOGLE_API_KEY } from "../constants";

const SuggestedVideos = ({ currentVideoId }) => {
  const [videos, setVideos] = useState([]);
  const isDarkMode = useSelector((state) => state.app.isDarkMode);

  useEffect(() => {
    const fetchSuggestedVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=IN&maxResults=10&key=${GOOGLE_API_KEY}`
        );
        const data = await response.json();
        const filteredVideos = data.items.filter(
          (video) => video.id !== currentVideoId
        );
        setVideos(filteredVideos);
      } catch (error) {
        console.error("Failed to fetch suggested videos:", error);
      }
    };

    fetchSuggestedVideos();
  }, [currentVideoId]);

  return (
    <div className="w-full md:w-1/5 pl-5">
      <h3
        className={`font-semibold text-lg mb-4 ${isDarkMode ? "text-white" : "text-black"}`}
      >
        Suggested Videos
      </h3>
      <div className="flex flex-wrap gap-4">
        {videos.map((video) => (
          <Link
            to={`/watch?v=${video.id}`}
            key={video.id}
            className={`flex w-full sm:w-1/2 md:w-full p-2 rounded-lg ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
          >
            <div className="flex flex-col w-full sm:w-1/2 md:w-full">
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-full h-24 rounded-lg"
              />
              <div className="ml-2 mt-2">
                <h4 className={`font-semibold text-sm ${isDarkMode ? "text-white" : "text-black"}`}>
                  {video.snippet.title}
                </h4>
                <p className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>
                  {video.snippet.channelTitle}
                </p>
                <p className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>
                  {video.snippet.publishedAt.split("T")[0]}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
  
  
};

export default SuggestedVideos;
