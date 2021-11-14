import React, { useContext } from "react";
import TaskList from "./TaskList";
import FormTodo from "./FormTodo";
import { ListContext } from "../../store/context";

const HomeScreen = () => {
  const { currSelect } = useContext(ListContext);

  return (
    <div>
      {currSelect?._id === 0 ||
        (Object.keys(currSelect).length === 0 && <FormTodo mode="0" />)}
      <TaskList />
    </div>
  );
};

export default HomeScreen;
