export const kFormatter = (num) => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(1) + "B"; // Billion
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + "M"; // Million
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + "K"; // Thousand
    } else {
      return num; // For numbers less than 1000, return as is
    }
  };
  