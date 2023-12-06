import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "6cd0e176c3eeff11651f09836c220109",
    language: "ko-KR",
  },
});

export default instance;
