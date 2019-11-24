const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://rslibrary.now.sh"
    : "http://127.0.0.1:3000";

export default baseUrl;
