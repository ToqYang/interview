import React, { useEffect, useState, useContext, useCallback } from "react";
import useForm from "../../hooks/useForm";
import axios from "axios";
import { BASE_URL } from "../../config/url_base";
import { ListContext } from "../../store/context";

const todo = {
  _id: 0,
  name: "",
  note: "",
  done: false,
};

const FormTodo = ({ info = todo, mode = "0", closeModal = null }) => {
  const [values, handleInputChange] = useForm(info);
  const { data, setData } = useContext(ListContext);
  const [submit, setSubmit] = useState(false);

  const makeEdit = useCallback(() => {
    let newObj = { data: { ...values }, original: { ...values } };
    delete newObj.data._id;
    const opt = {
      url: `${BASE_URL}/unicorn/${mode === "1" ? `${values._id}` : ""}`,
      method: mode === "0" ? "POST" : "PUT",
      data: newObj.data,
    };
    const consult = axios.request(opt);
    consult
      .then(function (response) {
        let newList = response.data;
        // Work to put and post
        if (mode === "0") {
          newList = [...data, newList];
        } else if (mode === "1") {
          newList = data.map((item) => {
            if (item._id === info._id) {
              return newObj.original;
            }
            return item;
          });
        }
        console.log("list: ", newList, data);
        setData(newList);
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
  }, [data, closeModal, info._id, mode, setData, values]);

  useEffect(() => {
    if (submit === true) {
      makeEdit();
    }
  }, [submit, makeEdit]);

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
          value={values?.name}
          onChange={handleInputChange}
          disabled={submit}
        />
        <label htmlFor="note-edit">Note</label>
        <input
          type="text"
          name="note"
          id="note-edit"
          value={values?.note}
          onChange={handleInputChange}
          disabled={submit}
        />
        <label htmlFor="done-edit">Done</label>
        <input
          type="checkbox"
          name="done"
          id="done-edit"
          value={values?.done}
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
