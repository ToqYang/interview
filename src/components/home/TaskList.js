import axios from "axios";
import React, { useState, useCallback } from "react";
import { BASE_URL } from "../../config/url_base";
import FormTodo from "./FormTodo";

const TaskList = ({ list = [], handleValues }) => {
  const [modalShow, setIsModalShow] = useState(false);
  const [currSelect, setCurrSelect] = useState({});
  const handleDelete = async (id) => {
    setIsModalShow(false);
    setCurrSelect({});
    const newList = list.filter((item) => item["_id"] !== id);
    handleValues(newList);
    await axios
      .delete(`${BASE_URL}/unicorn/${id}`)
      .then(function (response) {
        console.log("response delete: ", response);
      })
      .catch(function (error) {
        console.log("error delete", error);
      });
  };

  const listTasks = useCallback(() => {
    return list.map((value) => {
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
  }, [list]);

  const handleEdit = (id) => {
    console.log("edit");
  };

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
        <tbody>{list.length > 0 && Array.isArray(list) && listTasks()}</tbody>
      </table>
      {modalShow && (
        <FormTodo
          list={list}
          info={currSelect}
          mode="1"
          closeModal={closeModal}
          handleValues={handleValues}
        />
      )}
      <button type="button" onClick={(e) => handleValues([])}>
        Delete all Local
      </button>
      <button type="button" onClick={(e) => handleValues([""])}>
        Bring data
      </button>
    </>
  );
};

export default TaskList;
