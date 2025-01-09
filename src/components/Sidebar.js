import React from "react";
import { AiFillHome, AiFillLike } from "react-icons/ai";
import { RiVideoFill } from "react-icons/ri";
import {
  MdSubscriptions,
  MdVideoLibrary,
  MdHistory,
  MdOutlineWatchLater,
} from "react-icons/md";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const SideBar = () => {
  const isMenuOpen = useSelector((state) => state.app.isMenuOpen);
  const isDarkMode = useSelector((state) => state.app.isDarkMode);

  const btns = [
    { icon: <AiFillHome />, name: "Home", to: "/" },
    { icon: <MdSubscriptions />, name: "Subscriptions", to: "/subscriptions" },
    { icon: <MdVideoLibrary />, name: "Library", to: "/library" },
    { icon: <MdHistory />, name: "History", to: "/history" },
    { icon: <RiVideoFill />, name: "Your Videos", to: "/your-videos" },
    { icon: <MdOutlineWatchLater />, name: "Watch Later", to: "/watch-later" },
    { icon: <AiFillLike />, name: "Liked Videos", to: "/liked-videos" },
  ];

  const SideBtn = ({ icon, btnName, to }) => (
    <Link
      to={to}
      className={`flex items-center p-2 px-5 w-full my-2 justify-start rounded-lg ${
        isDarkMode
          ? "hover:bg-gray-700 text-white" // For dark mode
          : "hover:bg-gray-200 text-black" // For light mode
      }`}
    >
      <span
        className={`mr-2 ${
          isDarkMode ? "text-white" : "text-black" // Explicit color for icons
        }`}
      >
        {icon}
      </span>
      <span
        className={`${
          isDarkMode ? "text-white" : "text-black" // Explicit color for text
        }`}
      >
        {btnName}
      </span>
    </Link>
  );

  if (!isMenuOpen) return null;

  return (
    <div className={`w-52 mx-1 font-bold hidden md:block`}>
      <DarkModeToggle />
      {btns.map((btn, i) => (
        <SideBtn key={i} icon={btn.icon} btnName={btn.name} to={btn.to} />
      ))}
    </div>
  );
};

export default SideBar;
