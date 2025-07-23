import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api", // Update to your backend address
  headers: {
    "Content-Type": "application/json"
  }
});

export default instance;
