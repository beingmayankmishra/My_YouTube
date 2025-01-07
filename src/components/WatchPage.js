import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { YOUTUBE_VIDEO_DETAILS_API, YOUTUBE_CHANNEL_DETAILS_API } from "../constants";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [videoData, setVideoData] = useState(null);
  const [channelData, setChannelData] = useState(null);

  const videoId = searchParams.get("v");

  useEffect(() => {
    dispatch(closeMenu());

    const fetchVideoDetails = async () => {
      if (videoId) {
        try {
          // Fetch video details
          const videoResponse = await fetch(YOUTUBE_VIDEO_DETAILS_API + videoId);
          const videoJson = await videoResponse.json();
          const videoInfo = videoJson?.items?.[0];
          setVideoData(videoInfo);

          // Fetch channel details
          const channelId = videoInfo?.snippet?.channelId;
          if (channelId) {
            const channelResponse = await fetch(YOUTUBE_CHANNEL_DETAILS_API + channelId);
            const channelJson = await channelResponse.json();
            setChannelData(channelJson?.items?.[0]);
          }
        } catch (error) {
          console.error("Error fetching video or channel details:", error);
        }
      }
    };

    fetchVideoDetails();
  }, [dispatch, videoId]);

  if (!videoData || !channelData) {
    return <p className="text-center text-gray-600 mt-10">Loading video...</p>;
  }

  const { snippet, statistics } = videoData;
  const { title, channelTitle } = snippet;
  const { viewCount, likeCount } = statistics;
  const channelLogo = channelData?.snippet?.thumbnails?.default?.url;
  const subscriberCount = channelData?.statistics?.subscriberCount;

  return (
    <div className="flex flex-col px-5">
      {/* Video Player */}
      <div className="flex justify-center">
        <iframe
          className="w-[1100px] h-[600px] rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>

      {/* Video Details */}
      <div className="mt-5 max-w-[1100px] mx-auto flex flex-col space-y-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={channelLogo}
              alt={`${channelTitle} logo`}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="font-semibold">{channelTitle}</h2>
              <p className="text-sm text-gray-600">
                {viewCount} views • {subscriberCount} subscribers
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
            Subscribe
          </button>
        </div>

        {/* Interaction Buttons */}
        <div className="flex items-center justify-between mt-4 border-t border-gray-300 pt-4">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2">
              <span className="text-gray-700 font-semibold">{likeCount}</span>
              <span className="text-gray-500">Like</span>
            </button>
            <button className="flex items-center space-x-2">
              <span className="text-gray-700 font-semibold">Dislike</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
              Share
            </button>
            <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
