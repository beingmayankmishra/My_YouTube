import React from "react";

const WatchPageShimmer = () => {
  return (
    <div className="flex flex-row px-5 animate-pulse space-x-5">
      {/* Left Section: Video and Suggested Videos */}
      <div className="flex flex-col space-y-5 w-[1100px]">
        {/* Main Video Shimmer */}
        <div className="bg-gray-300 dark:bg-gray-700 w-full h-[600px] rounded-lg"></div>

        {/* Suggested Videos Shimmer */}
        <div className="space-y-5">
          {Array(4)
            .fill("")
            .map((_, index) => (
              <div key={index} className="flex items-start space-x-4">
                {/* Thumbnail */}
                <div className="bg-gray-300 dark:bg-gray-700 h-20 w-36 rounded-lg"></div>
                {/* Video Description */}
                <div className="flex flex-col space-y-2">
                  <div className="bg-gray-300 dark:bg-gray-700 h-4 w-3/4 rounded"></div>
                  <div className="bg-gray-300 dark:bg-gray-700 h-3 w-1/2 rounded"></div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Right Section: Suggested Videos in a Column */}
      <div className="w-[350px] space-y-5">
        {Array(8)
          .fill("")
          .map((_, index) => (
            <div key={index} className="flex items-center space-x-3">
              {/* Thumbnail Shimmer */}
              <div className="bg-gray-300 dark:bg-gray-700 h-24 w-40 rounded-lg"></div>
              {/* Video Info Shimmer */}
              <div className="space-y-2">
                <div className="bg-gray-300 dark:bg-gray-700 h-4 w-32 rounded"></div>
                <div className="bg-gray-300 dark:bg-gray-700 h-3 w-24 rounded"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WatchPageShimmer;
