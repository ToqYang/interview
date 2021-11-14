import React from "react";
import TaskList from "./TaskList";
import FormTodo from "./FormTodo";

const HomeScreen = () => {
  return (
    <div>
      <FormTodo mode="0" />
      <TaskList />
    </div>
  );
};

export default HomeScreen;
