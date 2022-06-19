import axios from "axios";

const getUser = (userInfo) => {
  const response = axios.post("api/v1/user/signin", userInfo);

  if (response) {
    localStorage.setItem("userToken", response.token);
    localStorage.setItem("user", response.data);
  }

  return response.data;
};

const httpService = {
  getUser,
};

export default httpService;
