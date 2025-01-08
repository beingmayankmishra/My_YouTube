
import React, { useEffect, useState } from "react";
import { GOOGLE_API_KEY } from "../constants";

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
    <div className="comments-section mt-5">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      <div className="space-y-4">
        {comments.map((comment, index) => {
          const { authorDisplayName, textDisplay, publishedAt } =
            comment.snippet.topLevelComment.snippet;
          return (
            <div key={index} className="comment-card p-4 bg-gray-100 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3">
                <img
                  src={`https://www.gravatar.com/avatar/${authorDisplayName.toLowerCase()}?d=robohash`}
                  alt={authorDisplayName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">{authorDisplayName}</p>
                  <p className="text-sm text-gray-600">{new Date(publishedAt).toLocaleDateString()}</p>
                </div>
              </div>
              <p className="mt-2 text-sm">{textDisplay}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
