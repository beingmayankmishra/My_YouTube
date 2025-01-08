import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setCategory } from "../utils/appSlice";

const SearchSuggestions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // Track if the user is actively typing
  const dispatch = useDispatch();

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
          const fetchedSuggestions = data[1]; // Suggestions are in the second index of the response
          setSuggestions(fetchedSuggestions);
        } else {
          console.error("Error fetching suggestions:", response.statusText);
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
    }, 300); // Debounce: fetch suggestions after 300ms

    return () => clearTimeout(delayDebounceFn); // Cleanup previous debounce
  }, [searchQuery, isTyping]);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      dispatch(setCategory(searchQuery));
      setSuggestions([]);
      setIsTyping(false); // Stop showing suggestions until user types again
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
    dispatch(setCategory(suggestion));
    setIsTyping(false); // Stop showing suggestions
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setIsTyping(true); // User is typing
  };

  return (
    <div className="relative flex items-center w-full max-w-[38%]">
      <input
        type="text"
        className="border border-gray-300 rounded-l-full px-4 py-2 w-full focus:outline-none"
        placeholder="Search"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button
        className="bg-gray-100 border border-gray-300 px-4 py-2 rounded-r-full hover:bg-gray-200 flex items-center"
        onClick={handleSearch}
      >
        <AiOutlineSearch className="text-xl text-gray-600" />
      </button>

      {/* Suggestions Dropdown */}
      {isTyping && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-md mt-1 z-10">
          <ul className="max-h-60 overflow-y-auto">
            {loading ? (
              <li className="px-4 py-2 text-gray-500">Loading...</li>
            ) : (
              suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
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
