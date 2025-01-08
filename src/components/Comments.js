import React, { useEffect, useState } from "react";
import { GOOGLE_API_KEY } from "../constants";
import { AiFillLike } from "react-icons/ai"; // Import AiFillLike for the like icon

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${GOOGLE_API_KEY}`
        );
        const data = await response.json();
        setComments(data.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setLoading(false);
      }
    };

    if (videoId) {
      fetchComments();
    }
  }, [videoId]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading comments...</p>;
  }

  if (comments.length === 0) {
    return <p className="text-center text-gray-600">No comments found.</p>;
  }

  return (
    <div className="comments-section mt-10">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>
      <div className="space-y-6">
        {comments.map((comment, index) => {
          const { authorDisplayName, textDisplay, publishedAt, authorProfileImageUrl } =
            comment.snippet.topLevelComment.snippet;

          return (
            <div key={index} className="comment-card p-4 bg-white rounded-lg shadow-lg">
              <div className="flex items-start space-x-4">
                <img
                  src={authorProfileImageUrl}
                  alt={authorDisplayName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">{authorDisplayName}</p>
                    <p className="text-sm text-gray-500">{new Date(publishedAt).toLocaleDateString()}</p>
                  </div>
                  <p className="mt-2 text-gray-700 text-sm">{textDisplay}</p>
                </div>
              </div>

              <div className="flex space-x-6 mt-3 text-gray-600">
                <button className="flex items-center space-x-2 hover:text-blue-500 transition-all">
                  <AiFillLike size={20} />
                  <span className="text-sm">Like</span>
                </button>
                {/* Removed Reply button */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
