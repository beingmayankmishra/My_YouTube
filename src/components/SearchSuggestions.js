import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../utils/appSlice";
import { useNavigate } from "react-router-dom";

const SearchSuggestions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const isDarkMode = useSelector((state) => state.app.isDarkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchQuery.trim() || !isTyping) {
        setSuggestions([]);
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(
          `https://web-production-5e8c5.up.railway.app/https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(
            searchQuery
          )}`
        );

        if (response.ok) {
          const data = await response.json();
          const fetchedSuggestions = data[1];
          setSuggestions(fetchedSuggestions);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, isTyping]);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      dispatch(setCategory(searchQuery));
      navigate("/");
      setSuggestions([]);
      setSearchQuery(""); // Clear the input field
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(""); // Clear the input field
    dispatch(setCategory(suggestion));
    navigate("/");
    setSuggestions([]);
    setIsTyping(false);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setIsTyping(true);
  };

  return (
    <div className="relative flex items-center w-full max-w-[38%]">
      <input
        type="text"
        className={`border px-4 py-2 w-full rounded-l-full focus:outline-none ${
          isDarkMode
            ? "border-gray-600 bg-gray-800 text-white"
            : "border-gray-300 bg-white text-black"
        }`}
        placeholder="Search"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button
        className={`px-4 py-3 rounded-r-full flex items-center ${
          isDarkMode
            ? "bg-black hover:bg-gray-800"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
        onClick={handleSearch}
      >
        <AiOutlineSearch className="text-xl" />
      </button>

      {isTyping && suggestions.length > 0 && (
        <div
          className={`absolute top-full left-0 right-0 mt-1 z-10 rounded-lg shadow-md ${
            isDarkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <ul className="max-h-60 overflow-y-auto">
            {loading ? (
              <li className="px-4 py-2">Loading...</li>
            ) : (
              suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className={`px-4 py-2 cursor-pointer ${
                    isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-300"
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;
