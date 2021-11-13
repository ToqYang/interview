import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import FormTodo from "./FormTodo";
import { fetchDataCall } from "../../config/handleApi";
import { BASE_URL } from "../../config/url_base";
import { ListContext } from "../../store/context";

const HomeScreen = () => {
  const [data, setData] = useState([]);

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
        <FormTodo mode="0" />
        <TaskList />
      </div>
    </ListContext.Provider>
  );
};

export default HomeScreen;
