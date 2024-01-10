import axios from "axios";

export default axios.create({
  baseURL: "http://whisprly-backend-env-1.eba-aamsv92k.us-east-2.elasticbeanstalk.com",
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true
})