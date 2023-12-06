import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "a0e72862806797c82c4d4fa4fdbdd684",
    language: "ko-kr",
  },
});

export default instance;
