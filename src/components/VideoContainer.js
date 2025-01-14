import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import moment from "moment";
import { YOUTUBE_VIDEO_API, YOUTUBE_SEARCH_API, kFormatter, YOUTUBE_VIDEO_DETAILS_API } from "../constants";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const category = useSelector((state) => state.app.category);
  const isDarkMode = useSelector((state) => state.app.isDarkMode);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(""); 
      try {
        let videoIds = [];

        if (category === "All") {
          const response = await fetch(YOUTUBE_VIDEO_API);
          const data = await response.json();
          videoIds = data.items.map((item) => item.id);
        } else {
          const response = await fetch(`${YOUTUBE_SEARCH_API}${category}`);
          const data = await response.json();

          if (!data.items || data.items.length === 0) {
            setError("No videos found. Try refreshing or changing the category.");
            setVideos([]);
            return;
          }

          videoIds = data.items.map((item) => item.id.videoId).filter(Boolean);
        }

        if (videoIds.length === 0) {
          setError("No valid video IDs found.");
          setVideos([]);
          return;
        }

        
        const videoDetailsResponse = await fetch(YOUTUBE_VIDEO_DETAILS_API(videoIds.join(",")));
        const videoDetailsData = await videoDetailsResponse.json();

        if (!videoDetailsData.items || videoDetailsData.items.length === 0) {
          setError("No video details found.");
          setVideos([]);
          return;
        }

        setVideos(videoDetailsData.items);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError("An error occurred while fetching videos.");
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [category]);

  const parseDuration = (duration) => {
    if (!duration) return "00:00";
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return "00:00";
    const hours = match[1] ? parseInt(match[1].replace("H", "")) : 0;
    const minutes = match[2] ? parseInt(match[2].replace("M", "")) : 0;
    const seconds = match[3] ? parseInt(match[3].replace("S", "")) : 0;

    return hours > 0
      ? `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      : `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (loading) return <Shimmer />;
  if (error) return <div>{error}</div>;

  return (
    <div
      className={`grid grid-cols-4 gap-6 p-4 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
    >
      {videos.map((video) => {
        const duration = parseDuration(video.contentDetails?.duration || "");

        return (
          <Link
            key={video.id?.videoId || video.id}
            to={`/watch?v=${video.id?.videoId || video.id}`}
            className={`video-card shadow-lg rounded-lg overflow-hidden ${
              isDarkMode ? "bg-gray-700" : "bg-white"
            } hover:scale-105 transition-transform duration-200`}
          >
            <div className="relative">
              <img
                src={video.snippet?.thumbnails?.medium?.url}
                alt={video.snippet?.title || "Video thumbnail"}
                className="w-full h-48 object-cover"
              />
              <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-1.5 py-0.5 rounded-sm">
                {duration}
              </span>
            </div>
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
        );
      })}
    </div>
  );
};

export default VideoContainer;
