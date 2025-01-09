import React from "react";

const WatchPageShimmer = () => {
  return (
    <div className="flex flex-row px-5 animate-pulse space-x-5">
      {/* Left Section: Video and Description */}
      <div className="flex-1 space-y-5">
        {/* Main Video Shimmer */}
        <div className="bg-gray-300 w-full h-[600px] rounded-lg"></div>
        
        {/* Video Description Shimmer */}
        <div className="space-y-3">
          <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
          <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
          <div className="flex items-center space-x-4">
            <div className="bg-gray-300 h-12 w-12 rounded-full"></div>
            <div className="space-y-2">
              <div className="bg-gray-300 h-4 w-40 rounded"></div>
              <div className="bg-gray-300 h-3 w-28 rounded"></div>
            </div>
            <div className="bg-gray-300 h-8 w-24 rounded"></div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="bg-gray-300 h-6 w-20 rounded"></div>
            <div className="bg-gray-300 h-6 w-20 rounded"></div>
          </div>
        </div>
      </div>

      {/* Right Section: Suggested Videos */}
      <div className="w-[350px] space-y-5">
        {Array(8)
          .fill("")
          .map((_, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="bg-gray-300 h-24 w-40 rounded-lg"></div>
              <div className="space-y-2">
                <div className="bg-gray-300 h-4 w-32 rounded"></div>
                <div className="bg-gray-300 h-3 w-24 rounded"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WatchPageShimmer;
