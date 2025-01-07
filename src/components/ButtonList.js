import React, { useState } from "react";
import { MdExplore } from "react-icons/md";

const ButtonList = () => {
  const [activeButton, setActiveButton] = useState("All"); // Tracks the active button

  const list = [
    "All",
    "Gaming",
    "Songs",
    "Live",
    "Sports",
    "Music",
    "News",
    "Love",
    "NextJs",
    "Laptops",
    "Mixes",
    "Jukebox",
    "Recently uploaded",
    "Kapil Sharma",
  ];

  const handleButtonClick = (btn) => {
    setActiveButton(btn); // Updates the active button
  };

  const buttonList = list.map((btn, i) => (
    <button
      key={i}
      onClick={() => handleButtonClick(btn)} // Handle button click
      className={`px-4 py-1 m-1 rounded-lg transition-colors duration-200 ${
        activeButton === btn ? "bg-gray-800 text-white" : "bg-gray-200"
      } hover:bg-gray-300`}
    >
      {btn}
    </button>
  ));

  return (
    <div className="flex font-semibold items-center overflow-x-auto whitespace-nowrap p-2">
      {/* Explore Button */}
      <button
        className={`flex items-center px-4 py-2 m-1 rounded-lg transition-colors duration-200 ${
          activeButton === "Explore" ? "bg-gray-800 text-white" : "bg-gray-200"
        } hover:bg-gray-300`}
        onClick={() => handleButtonClick("Explore")}
      >
        <MdExplore className="mr-2" /> Explore
      </button>

      {/* Button List */}
      {buttonList}
    </div>
  );
};

export default ButtonList;
