import React, { useEffect, useState } from "react";
import useForm from "../../hooks/useForm";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { BASE_URL } from "../../config/url_base";

const todo = {
  _id: 0,
  name: "",
  note: "",
  done: false,
};

const FormTodo = ({
  list = [],
  info = todo,
  mode = "0",
  closeModal = null,
  handleValues = null,
}) => {
  const [values, handleInputChange] = useForm(info);
  const [submit, setSubmit] = useState(false);
  const { name, done, note, _id } = values;

  useEffect(() => {
    if (submit === true && handleValues !== null && _id !== "") {
      let newObj = { ...values };
      delete newObj._id;
      const consult = axios.request({
        url: `${BASE_URL}/unicorn/${mode === "1" ? `${_id}` : ""}`,
        method: mode === "0" ? "POST" : "PUT",
        data: newObj,
      });
      consult
        .then(function (response) {
          let newList = response.data;
          // Work to put and post
          if (mode === "0") {
            newList = [...list, newList];
          } else if (mode === "1") {
            newList = list.map((item) => {
              if (item._id === info._id) {
                return newList;
              }
              return item;
            });
          }
          console.log("list: ", newList, list);
          handleValues(newList);
          console.log("Todo bien todo correcto yo que me alegro: ", response);
        })
        .catch(function (error) {
          console.log("error: ", error);
        })
        .finally(() => {
          setSubmit(false);
          if (closeModal !== null) {
            closeModal();
          }
        });
    }
  }, [submit]);

  return (
    <div>
      <h1>Edit</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("algo se presiono");
          setSubmit(true);
        }}
      >
        <label htmlFor="name-edit">Name</label>
        <input
          type="text"
          name="name"
          id="name-edit"
          value={name}
          onChange={handleInputChange}
          disabled={submit}
        />
        <label htmlFor="note-edit">Note</label>
        <input
          type="text"
          name="note"
          id="note-edit"
          value={note}
          onChange={handleInputChange}
          disabled={submit}
        />
        <label htmlFor="done-edit">Done</label>
        <input
          type="checkbox"
          name="done"
          id="done-edit"
          value={done}
          onChange={handleInputChange}
          disabled={submit}
        />
        <button type="submit">Submit</button>
      </form>
      {mode === "1" && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            closeModal();
          }}
        >
          Close
        </button>
      )}
    </div>
  );
};

export default FormTodo;
