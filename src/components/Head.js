import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { SiYoutube } from "react-icons/si";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import SearchSuggestions from "./SearchSuggestions";
import { FaRegBell } from "react-icons/fa6";
import { MdOutlineVideoCall } from "react-icons/md";
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

      <div className="flex justify-end items-center space-x-6 pr-4">
        {/* Video upload icon */}
        <MdOutlineVideoCall className="text-3xl cursor-pointer" />

        {/* Bell icon */}
        <FaRegBell className="text-xl cursor-pointer" />

        {/* User Icon */}
        <FaUserCircle className="text-4xl cursor-pointer" />
      </div>
      
    </div>
  );
};

export default Head;
