import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { SiYoutube } from "react-icons/si";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import SearchSuggestions from "./SearchSuggestions"; // Import the SearchSuggestions component

const Head = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center border-b px-4 py-3">
      <div className="flex items-center space-x-1">
        {/* Hamburger Menu */}
        <GiHamburgerMenu
          onClick={() => dispatch(toggleMenu())}
          className="text-xl cursor-pointer mr-10"
        />

        {/* YouTube Logo */}
        <SiYoutube className="text-4xl text-red-600" />
        <b className="cursor-pointer text-lg">MyYouTube</b>
      </div>

      {/* Search Bar with Suggestions */}
      <SearchSuggestions />

      {/* User Icon */}
      <div className="flex items-center text-xl space-x-4">
        <FaUserCircle className="text-4xl cursor-pointer" />
      </div>
    </div>
  );
};

export default Head;
