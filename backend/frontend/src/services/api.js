import axios from "axios";

const API = axios.create({
  baseURL: "https://opspilot-b1s1.onrender.com",
});

export default API;
