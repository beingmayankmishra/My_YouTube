import React from "react";

const Shimmer = () => {
  const shimmerCards = Array(16).fill(0); 

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {shimmerCards.map((_, index) => (
        <div
          key={index}
          className="bg-gray-300 animate-pulse rounded-lg p-4 h-60"
        >
          <div className="h-40 bg-gray-400 rounded"></div>
          <div className="h-4 bg-gray-400 rounded mt-4"></div>
          <div className="h-4 bg-gray-400 rounded mt-2 w-3/4"></div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
