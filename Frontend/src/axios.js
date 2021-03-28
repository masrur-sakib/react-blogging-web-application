import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:9000",
  baseURL: "https://react-blogging-site.herokuapp.com",
});

export default instance;
