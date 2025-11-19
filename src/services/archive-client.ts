import axios from "axios";

const archiveClient = axios.create({
  baseURL: "https://archive.org/advancedsearch.php",
  headers: {
    "Content-Type": "application/json",
  },
});

export default archiveClient;
