import React from "react";

const VideoCard = ({ video }) => {
  const { snippet } = video;
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <img
        src={snippet?.thumbnails?.medium?.url}
        alt={snippet?.title}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="mt-2 text-lg font-semibold">{snippet?.title}</h3>
      <p className="text-gray-500">{snippet?.channelTitle}</p>
    </div>
  );
};

export default VideoCard;