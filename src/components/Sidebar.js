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

const SideBar = () => {
  const isMenuOpen = useSelector((state) => state.app.isMenuOpen); 

  
  const btns = [
    { icon: <AiFillHome />, name: "Home", to: "/" },
    { icon: <MdSubscriptions />, name: "Subscriptions", to: "/subscriptions" },
    { icon: <MdVideoLibrary />, name: "Library", to: "/library" },
    { icon: <MdHistory />, name: "History", to: "/history" },
    { icon: <RiVideoFill />, name: "Your Videos", to: "/your-videos" },
    { icon: <MdOutlineWatchLater />, name: "Watch Later", to: "/watch-later" },
    { icon: <AiFillLike />, name: "Liked Videos", to: "/liked-videos" },
  ];

  
  const SideBtn = ({ icon, btnName, to }) => {
    return (
      <Link
        to={to} // Route for navigation
        className="flex items-center p-2 px-5 w-full my-2 justify-start hover:bg-gray-200 rounded-lg"
      >
        <span className="mr-2">{icon}</span> {btnName}
      </Link>
    );
  };

  if (!isMenuOpen) return null; // Only render if the menu is open

  return (
    <div className="w-52 mx-1 font-bold hidden md:block">
      {btns.map((btn, i) => (
        <SideBtn key={i} icon={btn.icon} btnName={btn.name} to={btn.to} />
      ))}
    </div>
  );
};

export default SideBar;
