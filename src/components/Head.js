import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { SiYoutube } from "react-icons/si";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toggleMenu, setCategory } from "../utils/appSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      dispatch(setCategory(searchQuery)); // Dispatch search query as category
    }
  };

  return (
    <div className="flex justify-between items-center border-b px-4 py-3">
      <div className="flex items-center space-x-1">
        <GiHamburgerMenu
          onClick={() => dispatch(toggleMenu())}
          className="text-xl cursor-pointer mr-10"
        />
        <SiYoutube className="text-4xl text-red-600" />
        <b className="cursor-pointer text-lg">MyYouTube</b>
      </div>

      <div className="flex items-center w-[38%]">
        <input
          type="text"
          className="border border-gray-300 rounded-l-full px-4 py-2 w-full focus:outline-none"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-r-full hover:bg-gray-200 flex items-center"
          onClick={handleSearch}
        >
          <AiOutlineSearch className="text-xl text-gray-600" />
        </button>
      </div>

      <div className="flex items-center text-xl space-x-4">
        <FaUserCircle className="text-4xl cursor-pointer" />
      </div>
    </div>
  );
};

export default Head;
