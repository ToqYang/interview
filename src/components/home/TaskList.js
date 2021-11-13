import axios from "axios";
import React, { useState, useCallback, useContext } from "react";
import { BASE_URL } from "../../config/url_base";
import FormTodo from "./FormTodo";
import { ListContext } from "../../store/context";

const TaskList = () => {
  const { data, setData } = useContext(ListContext);
  const [modalShow, setIsModalShow] = useState(false);
  const [currSelect, setCurrSelect] = useState({});
  const handleDelete = useCallback(
    async (id) => {
      setIsModalShow(false);
      setCurrSelect({});
      const newList = data.filter((item) => item["_id"] !== id);
      setData(newList);
      await axios
        .delete(`${BASE_URL}/unicorn/${id}`)
        .then(function (response) {
          console.log("response delete: ", response);
        })
        .catch(function (error) {
          console.log("error delete", error);
        });
    },
    [data, setData]
  );

  const listTasks = useCallback(() => {
    return data.map((value) => {
      const values = Object.values(value);
      return (
        <tr key={value["_id"]}>
          {values.map((item, idx) => (
            <td key={idx}>{item}</td>
          ))}
          <td>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setCurrSelect(value);
                setIsModalShow(true);
              }}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={async (e) => {
                e.preventDefault();
                await handleDelete(value["_id"]);
              }}
            >
              Eliminate
            </button>
          </td>
        </tr>
      );
    });
  }, [data, handleDelete]);

  //   const handleEdit = (id) => {
  //     console.log("edit");
  //   };

  const closeModal = () => {
    setIsModalShow(false);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>note</th>
            <th>done</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{data.length > 0 && Array.isArray(data) && listTasks()}</tbody>
      </table>
      {modalShow && (
        <FormTodo info={currSelect} mode="1" closeModal={closeModal} />
      )}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setData([]);
        }}
      >
        Delete all Local
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          console.log("Error");
        }}
      >
        Bring data
      </button>
    </>
  );
};

export default TaskList;
