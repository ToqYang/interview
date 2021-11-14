import axios from "axios";
import React, { useState, useCallback, useContext } from "react";
import { BASE_URL } from "../../config/url_base";
import FormTodo from "./FormTodo";
import { ListContext } from "../../store/context";
import Swal from "sweetalert2";

const TaskList = () => {
  const { data, setData, setCurrSelect } = useContext(ListContext);
  const [modalShow, setIsModalShow] = useState(false);
  const handleDelete = useCallback(
    async (id) => {
      setIsModalShow(false);
      setCurrSelect({});
      const newList = data.filter((item) => item["_id"] !== id);
      setData(newList);
      await axios
        .delete(`${BASE_URL}/${id}`)
        .then(function (response) {})
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
          });
        });
    },
    [data, setData, setCurrSelect]
  );

  const listTasks = useCallback(() => {
    return data.map((value) => {
      const values = Object.values(value);
      return (
        <tr key={value["_id"]}>
          {values.map((item, idx) => {
            if (idx === 0) {
              return (
                <th scope="row" key={idx}>
                  {String(item)}
                </th>
              );
            }
            return <td key={idx}>{String(item)}</td>;
          })}
          <td>
            <button
              className="btn btn-dark"
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
              className="btn btn-danger"
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
  }, [data, handleDelete, setCurrSelect]);

  const closeModal = () => {
    setIsModalShow(false);
  };

  return (
    <div style={{ overflowX: "scroll" }}>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">done</th>
              <th scope="col">name</th>
              <th scope="col">note</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{data.length > 0 && Array.isArray(data) && listTasks()}</tbody>
        </table>
      </div>
      {modalShow && <FormTodo mode="1" closeModal={closeModal} />}
      <button
        className="btn btn-outline-danger mt-5"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setData([]);
        }}
      >
        Delete all Local
      </button>
    </div>
  );
};

export default TaskList;
