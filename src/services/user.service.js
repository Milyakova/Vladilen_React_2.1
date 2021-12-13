import httpServices from "./http.services";

const userEndPoint = "user/";

const userService = {
  get: async () => {
    const { data } = await httpServices.get(userEndPoint);
    return data;
  }
};
export default userService;
