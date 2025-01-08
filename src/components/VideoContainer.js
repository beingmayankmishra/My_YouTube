import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  YOUTUBE_VIDEO_API,
  YOUTUBE_SEARCH_API,
  kFormatter,
} from "../constants";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import moment from "moment"; // Import moment for formatting the publication date

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const category = useSelector((state) => state.app.category);

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
    <div className="grid grid-cols-4 gap-6 p-4">
    {videos.map((video) => (
      <Link
        key={video.id?.videoId || video.id}
        to={`/watch?v=${video.id?.videoId || video.id}`}
        className="video-card bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200"
      >
        {/* Thumbnail */}
        <img
          src={video.snippet?.thumbnails?.medium?.url}
          alt={video.snippet?.title || "Video thumbnail"}
          className="w-full h-48 object-cover"
        />
        {/* Video Info */}
        <div className="p-3">
          <h3 className="font-semibold text-md text-gray-800 line-clamp-2">
            {video.snippet?.title || "No Title Available"}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {video.snippet?.channelTitle || "Unknown Channel"}
          </p>
          {/* Views and Publication Time */}
          <div className="flex items-center text-sm text-gray-500 mt-2">
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
