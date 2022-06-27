import axios from "axios";

const getUser = async (userInfo) => {
  const response = await axios.post("api/v1/user/signin", userInfo);

  console.log(response.data);
  if (response) {
    localStorage.setItem("accessToken", JSON.stringify(response.token));
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const httpService = {
  getUser,
};

export default httpService;
