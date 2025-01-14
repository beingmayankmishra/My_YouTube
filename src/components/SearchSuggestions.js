import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setVoiceText } from "../utils/appSlice";
import { useNavigate } from "react-router-dom";

const SearchSuggestions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const voiceText = useSelector((state) => state.app.voiceText); 
  const isDarkMode = useSelector((state) => state.app.isDarkMode);

  
  let recognition;

  
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
          setSuggestions(data[1]);
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
      setSearchQuery(""); 
      setSuggestions([]); 
      setIsTyping(false); 
    }
  };

 
  const handleSuggestionClick = (suggestion) => {
    dispatch(setCategory(suggestion)); 
    navigate("/"); 
    setSearchQuery(""); 
    setSuggestions([]); 
    setIsTyping(false); 
  };

  
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setIsTyping(true);
  };

  
  const startVoiceSearch = () => {
    if (isListening) return; 

   
    recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    
    dispatch(setVoiceText("")); 
    setIsListening(true);

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      dispatch(setVoiceText(transcript)); 
      setSearchQuery(transcript); 
    };

    recognition.onerror = (event) => {
      console.error("Error in speech recognition:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
     
      if (voiceText.trim() !== "") {
        dispatch(setCategory(voiceText)); 
        navigate("/"); 
        setSuggestions([]); 
      }
    };
  };

  
  useEffect(() => {
    if (!isListening && voiceText.trim() !== "") {
      
      dispatch(setCategory(voiceText)); 
      navigate("/"); 
      setSuggestions([]); 
    }
  }, [voiceText, isListening, dispatch, navigate]);

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

      {/* Voice Search Button */}
      <button
        onClick={startVoiceSearch}
        className={`px-4 py-3 rounded-full flex items-center ml-2 ${
          isDarkMode
            ? "bg-black hover:bg-gray-800"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
      >
        <FaMicrophone className="text-xl" />
      </button>

      {/* Listening Popup */}
      {isListening && (
        <div
          className={`absolute top-16 left-0 right-0 z-10 p-8 rounded-lg shadow-lg min-h-[200px] backdrop-blur-sm ${
            isDarkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <p className="text-center text-xl font-semibold">Listening...</p>
          <div className="flex items-center justify-center mt-3">
            <FaMicrophone className="text-4xl" />
          </div>
          <p className="mt-3 text-center text-lg">{voiceText}</p>
        </div>
      )}

     {/* Suggestions List */}
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
            className={`flex items-center px-4 py-2 cursor-pointer ${
              isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-300"
            }`}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            <AiOutlineSearch className="mr-3 text-lg" />
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
