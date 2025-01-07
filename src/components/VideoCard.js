import React from "react";
import { RxDotFilled } from "react-icons/rx";
import moment from "moment";
import { kFormatter } from "../utils/constants"; // Import kFormatter for formatting large numbers

const VideoCard = ({ info }) => {
  const { snippet, statistics } = info || {}; // Ensure info is not undefined
  const { channelTitle, title, thumbnails, publishedAt } = snippet || {};

  return (
    <div className="space-y-2 mb-2 md:w-[19.5rem] md:m-2 md:my-3 cursor-pointer p-1 rounded-lg">
      {thumbnails && (
        <img
          src={thumbnails?.medium?.url}
          alt="thumbnail"
          className="rounded-xl w-full"
        />
      )}
      <div className="flex flex-col px-2">
        <h2 className="font-bold">{title || "No title available"}</h2>
        <div className="flex items-center text-xs font-bold text-gray-500">
          <p>{channelTitle || "Unknown channel"}</p> <RxDotFilled />
          
          {/* Directly render view count */}
          <p>{statistics ? kFormatter(Number(statistics.viewCount)) : "N/A"} views</p> <RxDotFilled />
          
          {/* Render publication time */}
          <p>{moment(publishedAt).fromNow()}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
