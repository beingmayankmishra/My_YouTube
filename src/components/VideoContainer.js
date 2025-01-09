import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import moment from "moment"; // Import moment for formatting the publication date
import { YOUTUBE_VIDEO_API, YOUTUBE_SEARCH_API, kFormatter } from "../constants";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const category = useSelector((state) => state.app.category);
  const isDarkMode = useSelector((state) => state.app.isDarkMode);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          category === "All"
            ? YOUTUBE_VIDEO_API
            : `${YOUTUBE_SEARCH_API}${category}`
        );
        const data = await response.json();
        setVideos(data.items || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [category]);

  if (loading) {
    return <Shimmer />;
  }

  if (!videos || videos.length === 0) {
    return <div>No videos found. Try refreshing or changing the category.</div>;
  }

  return (
    <div
      className={`grid grid-cols-4 gap-6 p-4 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {videos.map((video) => (
        <Link
          key={video.id?.videoId || video.id}
          to={`/watch?v=${video.id?.videoId || video.id}`}
          className={`video-card shadow-lg rounded-lg overflow-hidden ${
            isDarkMode ? "bg-gray-700" : "bg-white"
          } hover:scale-105 transition-transform duration-200`}
        >
          <img
            src={video.snippet?.thumbnails?.medium?.url}
            alt={video.snippet?.title || "Video thumbnail"}
            className="w-full h-48 object-cover"
          />
          <div className="p-3">
            <h3 className="font-semibold text-md line-clamp-2">
              {video.snippet?.title || "No Title Available"}
            </h3>
            <p className="text-sm mt-1">
              {video.snippet?.channelTitle || "Unknown Channel"}
            </p>
            <div className="flex items-center text-sm mt-2">
              <p>{kFormatter(video.statistics?.viewCount || 0)} views</p>
              <span className="mx-2">.</span>
              <p>{moment(video.snippet?.publishedAt).fromNow()}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
