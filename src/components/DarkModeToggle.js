import React from "react";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../utils/appSlice";

const DarkModeToggle = () => {
  const isDarkMode = useSelector((state) => state.app.isDarkMode); // Access isDarkMode from Redux
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleDarkMode()); // Dispatch toggleDarkMode action
    if (isDarkMode) {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center px-4 py-2 m-1 -ml-2 rounded-lg transition-colors duration-200 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600"
    >
      {isDarkMode ? (
        <BsFillSunFill className="text-yellow-500 text-xl " />
      ) : (
        <BsFillMoonStarsFill className="text-gray-800 text-xl " />
      )}
      <span className="whitespace-nowrap">
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
  
  
};

export default DarkModeToggle;
