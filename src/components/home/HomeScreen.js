import React, { useEffect, useState, useCallback } from "react";
import TaskList from "./TaskList";
import FormTodo from "./FormTodo";
import { fetchDataCall } from "../../config/handleApi";
import { BASE_URL } from "../../config/url_base";
import { ListContext } from "../../store/context";

const HomeScreen = () => {
  const [data, setData] = useState([]);

  const handleValues = (info) => {
    setData(info);
  };

  useEffect(() => {
    const fetchData = async (api) => {
      let response = await fetchDataCall({ api: api });
      setData(response.data);
      console.log("response: ", response);
    };

    fetchData(`${BASE_URL}/unicorn`);
  }, []);

  return (
    <ListContext.Provider value={{ data, setData }}>
      <div>
        <h1>Home Screen</h1>
        <FormTodo list={data} handleValues={handleValues} mode="0" />
        <TaskList list={data} handleValues={handleValues} />
      </div>
    </ListContext.Provider>
  );
};

export default HomeScreen;
