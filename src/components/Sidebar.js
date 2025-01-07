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

const SideBar = () => {
  const isMenuOpen = useSelector((state) => state.app.isMenuOpen); // Accessing state correctly

  const btns = [
    { icon: <AiFillHome />, name: "Home" },
    { icon: <MdSubscriptions />, name: "Subscriptions" },
    { icon: <MdVideoLibrary />, name: "Library" },
    { icon: <MdHistory />, name: "History" },
    { icon: <RiVideoFill />, name: "Your Videos" },
    { icon: <MdOutlineWatchLater />, name: "Watch Later" },
    { icon: <AiFillLike />, name: "Liked Videos" },
  ];

  const SideBtn = ({ icon, btnName }) => {
    return (
      <button className="flex items-center p-2 px-5 w-full my-2 justify-start hover:bg-gray-200 rounded-lg">
        <span className="mr-2">{icon}</span> {btnName}
      </button>
    );
  };

  if (!isMenuOpen) return null; // Only render if the menu is open

  return (
    <div className="w-52 mx-1 font-bold hidden md:block">
      {btns.map((btn, i) => (
        <SideBtn key={i} icon={btn.icon} btnName={btn.name} />
      ))}
    </div>
  );
};

export default SideBar;
