import axios from "axios";
import { BASE_URL } from "./url_base";

export const fetchDataCall = async () => {
  let apiReturn = await axios
    .get(BASE_URL)
    .then(async function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
  return apiReturn;
};

export const ordered = (unordered) => {
  return Object.keys(unordered)
    .sort()
    .reduce((obj, key) => {
      obj[key] = unordered[key];
      return obj;
    }, {});
};

export const handlePostPut = (mode, data, newList, currSelect, newObj) => {
  if (mode === "0") {
    newList = [...data, ordered(newList)];
  } else if (mode === "1") {
    newList = data.map((item) => {
      if (item?._id === currSelect?._id) {
        return ordered(newObj.original);
      }
      return item;
    });
  }
  return newList;
};

export const handleConfigRequest = (values, mode) => {
  const newObj = { data: { ...values }, original: { ...values } };
  delete newObj.data._id;
  const opt = {
    url: `${BASE_URL}/${mode === "1" ? `${values._id}` : ""}`,
    method: mode === "0" ? "POST" : "PUT",
    data: newObj.data,
  };

  return { newObj, opt };
};
