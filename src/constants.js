
 
export const GOOGLE_API_KEY = "AIzaSyB7x4AacEABS_aEdemmi61xA3mfIDLJAMA"; 

export const YOUTUBE_VIDEO_API = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=IN&maxResults=50&key=${GOOGLE_API_KEY}`;

export const YOUTUBE_SEARCH_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&key=${GOOGLE_API_KEY}&q=`;

export const YOUTUBE_VIDEO_DETAILS_API = (videoIds) =>
  `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${GOOGLE_API_KEY}`;

export const kFormatter = (num) => {
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  } else if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num;
};



