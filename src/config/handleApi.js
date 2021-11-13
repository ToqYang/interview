import axios from "axios";

export const fetchDataCall = async ({ api }) => {
  let apiReturn = await axios
    .get(api)
    .then(async function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
  return apiReturn;
};
