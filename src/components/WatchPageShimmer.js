import React from "react";

const WatchPageShimmer = () => {
  return (
    <div className="flex flex-row px-5 animate-pulse space-x-5">
      <div className="flex flex-col space-y-5 w-[1100px]">
        <div className="bg-gray-300 dark:bg-gray-700 w-full h-[600px] rounded-lg"></div>

        <div className="space-y-5">
          {Array(4)
            .fill("")
            .map((_, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-gray-300 dark:bg-gray-700 h-20 w-36 rounded-lg"></div>

                <div className="flex flex-col space-y-2">
                  <div className="bg-gray-300 dark:bg-gray-700 h-4 w-3/4 rounded"></div>
                  <div className="bg-gray-300 dark:bg-gray-700 h-3 w-1/2 rounded"></div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="w-[350px] space-y-5">
        {Array(8)
          .fill("")
          .map((_, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="bg-gray-300 dark:bg-gray-700 h-24 w-40 rounded-lg"></div>

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
