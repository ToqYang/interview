import React, { useState, useContext, useCallback } from "react";
import useForm from "../../hooks/useForm";
import axios from "axios";
import { ListContext } from "../../store/context";
import { handleConfigRequest, handlePostPut } from "../../config/handleApi";

const FormTodo = ({ mode = "0", closeModal = null }) => {
  const { data, setData, currSelect, setCurrSelect } = useContext(ListContext);
  const [values, handleInputChange, reset] = useForm(currSelect);
  const [submit, setSubmit] = useState(false);

  const submitFinish = useCallback(() => {
    setSubmit(false);
    if (closeModal !== null) {
      closeModal();
      setCurrSelect({});
    }
  }, [closeModal, setCurrSelect]);

  const makeEdit = useCallback(() => {
    const { opt, newObj } = handleConfigRequest(values, mode);
    const consult = axios.request(opt);
    consult
      .then(function (response) {
        let newList = response.data;
        newList = handlePostPut(mode, data, newList, currSelect, newObj);
        setData(newList);
      })
      .catch(function (error) {
        console.log("error: ", error);
      })
      .finally(() => {
        submitFinish();
      });
  }, [data, currSelect, mode, values, setData, submitFinish]);

  return (
    <div>
      <h1>Edit</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmit(true);
          makeEdit();
          reset({
            _id: 0,
            done: false,
            note: "",
            name: "",
          });
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
          checked={values?.done}
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
            setCurrSelect({});
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
