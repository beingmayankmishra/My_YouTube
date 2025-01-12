import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import moment from "moment";
import { YOUTUBE_VIDEO_DETAILS_API, GOOGLE_API_KEY, kFormatter } from "../constants";
import { AiFillLike, AiFillDislike, AiOutlineDownload } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import Comments from "../components/Comments"; 
import SuggestedVideos from "../components/SuggestedVideos";
import WatchPageShimmer from "./WatchPageShimmer";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [videoData, setVideoData] = useState(null);
  const [channelData, setChannelData] = useState(null);

  const videoId = searchParams.get("v");

  useEffect(() => {
   
    window.scrollTo(0, 0);

    dispatch(closeMenu());

    const fetchVideoDetails = async () => {
      if (videoId) {
        try {
          const videoResponse = await fetch(YOUTUBE_VIDEO_DETAILS_API + videoId);
          const videoJson = await videoResponse.json();
          const videoInfo = videoJson?.items?.[0];
          setVideoData(videoInfo);

          const channelId = videoInfo?.snippet?.channelId;
          if (channelId) {
            const channelResponse = await fetch(
              `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${GOOGLE_API_KEY}`
            );
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
    return <WatchPageShimmer />;
  }

  const { snippet, statistics } = videoData;
  const { title, channelTitle, publishedAt } = snippet;
  const { viewCount, likeCount } = statistics;
  const channelLogo = channelData?.snippet?.thumbnails?.default?.url;
  const subscriberCount = channelData?.statistics?.subscriberCount;

  return (
    <div className="flex flex-row px-5">
      {/* Left Section: Main Video and Details */}
      <div className="flex-1">
        <div className="flex justify-center py-5">
          <iframe
            className="w-[1100px] h-[600px] rounded-lg shadow-md"
            src={`https://www.youtube.com/embed/${videoId}?&autoplay=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Details */}
        <div className="mt-5 w-full max-w-[1100px] px-4 flex flex-col space-y-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="flex items-center justify-start space-x-4 border-b border-gray-300 pb-4">
            <div className="flex items-center space-x-4">
              <img
                src={channelLogo}
                alt={`${channelTitle} logo`}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="font-semibold">{channelTitle}</h2>
                <p className="text-sm text-gray-600">
                  {kFormatter(subscriberCount || 0)} subscribers
                </p>
              </div>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600">
                Subscribe
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-black">
                  <AiFillLike size={20} />
                  <span className="font-semibold">{kFormatter(likeCount || 0)}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-700 hover:text-black">
                  <AiFillDislike size={20} />
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                  <RiShareForwardLine size={20} />
                  <span>Share</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                  <AiOutlineDownload size={20} />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center text-gray-600 text-sm font-bold mt-4">
            <p>{kFormatter(viewCount || 0)} views</p>
            <span className="mx-2">•</span>
            <p>{moment(publishedAt).fromNow()}</p>
          </div>
        </div>

        {/* Comments Section */}
        <Comments videoId={videoId} />
      </div>

      {/* Right Section: Suggested Videos */}
      <SuggestedVideos currentVideoId={videoId} />
    </div>
  );
};

export default WatchPage;
