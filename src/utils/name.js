export const getCompanyName = (url) => {
  if (url.includes(".")) {
    return url.split(".")[1].toUpperCase();
  }
  return url;
};
