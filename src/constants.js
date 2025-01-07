const GOOGLE_API_KEY = "AIzaSyDgDfSSINChrs5or5bEQohAFvYpkJ1pbDg";

export const YOUTUBE_VIDEO_API = `
  https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=IN&maxResults=50&key=${GOOGLE_API_KEY}`;

export const YOUTUBE_VIDEO_DETAILS_API = `
  https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&key=${GOOGLE_API_KEY}&id=`;

export const YOUTUBE_CHANNEL_DETAILS_API = `
  https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&key=${GOOGLE_API_KEY}&id=`;
