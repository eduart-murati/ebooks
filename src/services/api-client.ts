// src/services/api-client.ts
import axios from "axios";

const apiClient = axios.create({
  
  baseURL: "https://openlibrary.org/", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
