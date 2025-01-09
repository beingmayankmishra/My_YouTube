import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCategory } from "../utils/appSlice";
import { MdExplore } from "react-icons/md";

const ButtonList = () => {
  const [activeButton, setActiveButton] = useState("All");
  const dispatch = useDispatch();

  const list = [
    "All",
    "Gaming",
    "Songs",
    "Live",
    "Sports",
    "Music",
    "News",
    "Punjabi Songs",
    "NextJs",
    "Laptops",
    "Mixes",
    "Jukebox",
    "Kapil Sharma",
    "Comedy Movies",
    
  ];

  const handleButtonClick = (btn) => {
    setActiveButton(btn);
    dispatch(setCategory(btn)); // Dispatch selected category to Redux
  };

  return (
    <div className="flex font-semibold items-center overflow-x-auto whitespace-nowrap p-2">
      <button
        className={`flex items-center px-4 py-2 m-1 rounded-lg transition-colors duration-200 ${
          activeButton === "Explore" ? "bg-gray-800 text-white" : "bg-gray-200"
        } hover:bg-gray-300`}
        onClick={() => handleButtonClick("Explore")}
      >
        <MdExplore className="mr-2" /> Explore
      </button>

      {list.map((btn, i) => (
        <button
          key={i}
          onClick={() => handleButtonClick(btn)}
          className={`px-4 py-1 m-1 rounded-lg transition-colors duration-200 ${
            activeButton === btn ? "bg-gray-800 text-white" : "bg-gray-200"
          } hover:bg-gray-300`}
        >
          {btn}
        </button>
      ))}
    </div>
  );
};

export default ButtonList;
