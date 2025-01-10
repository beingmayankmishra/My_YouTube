import React from "react";
import { BiHomeAlt2, BiLike, BiNews } from "react-icons/bi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { VscHistory } from "react-icons/vsc";
import {
  PiFilmSlate,
  PiLightbulbFilamentLight,
  PiMusicNoteBold,
} from "react-icons/pi";
import { SiYoutubegaming } from "react-icons/si";
import { ImFire } from "react-icons/im";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const SideBar = () => {
  const isMenuOpen = useSelector((state) => state.app.isMenuOpen);
  const isDarkMode = useSelector((state) => state.app.isDarkMode);

  const btns = [
    { icon: <BiHomeAlt2 size={20} />, name: "Home", to: "/" },
    { icon: <BiLike size={20} />, name: "Liked videos", to: "/" },
    { icon: <VscHistory size={20} />, name: "History", to: "/" },
    { icon: <AiOutlineClockCircle size={20} />, name: "Watch later", to: "/" },
    { icon: <ImFire size={20} />, name: "Trending", to: "/" },
    { icon: <PiMusicNoteBold size={20} />, name: "Music", to: "/" },
    { icon: <SiYoutubegaming size={20} />, name: "Gaming", to: "/" },
    { icon: <PiFilmSlate size={20} />, name: "Movies", to: "/" },
    { icon: <BiNews size={20} />, name: "News", to: "/" },
    { icon: <PiLightbulbFilamentLight size={20} />, name: "Learning", to: "/" },
  ];

  const SideBtn = ({ icon, btnName, to }) => (
    <Link
      to={to}
      className={`flex items-center p-2 px-5 w-full my-2 justify-start rounded-lg ${
        isDarkMode
          ? "hover:bg-gray-700 text-white" 
          : "hover:bg-gray-200 text-black" 
      }`}
    >
      <span
        className={`mr-2 ${
          isDarkMode ? "text-white" : "text-black" 
        }`}
      >
        {icon}
      </span>
      <span
        className={`${
          isDarkMode ? "text-white" : "text-black" 
        }`}
      >
        {btnName}
      </span>
    </Link>
  );
  
  if (!isMenuOpen) return null;
  
  return (
    <div className={`w-52 mx-1 font-bold hidden md:block`}>
     
         
  <div className="flex items-center justify-between mt-2 px-5">
    <div className="flex items-center">
      <span className="mr-2"></span>
    </div>
    <DarkModeToggle />
  </div>
  
      
      <div>
        {btns.slice(0, 4).map((btn, i) => (
          <SideBtn key={i} icon={btn.icon} btnName={btn.name} to={btn.to} />
        ))}
      </div>
  
      
      <hr
        className={`my-4 ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        }`}
      />
  
      
      <h1
        className={`text-lg px-5 mt-3 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Explore
      </h1>
  
      <div>
        {btns.slice(4).map((btn, i) => (
          <SideBtn key={i} icon={btn.icon} btnName={btn.name} to={btn.to} />
        ))}
      </div>
    </div>
  );
  
};

export default SideBar;
