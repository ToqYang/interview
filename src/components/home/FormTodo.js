import React, { useState, useContext, useCallback } from "react";
import useForm from "../../hooks/useForm";
import axios from "axios";
import { ListContext } from "../../store/context";
import { handleConfigRequest, handlePostPut } from "../../config/handleApi";
import Swal from "sweetalert2";

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
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      })
      .finally(() => {
        submitFinish();
      });
  }, [data, currSelect, mode, values, setData, submitFinish]);

  return (
    <div>
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
        <div className="d-flex flex-column">
          <label htmlFor="name-edit">Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            id="name-edit"
            value={values?.name}
            onChange={handleInputChange}
            disabled={submit}
            required
          />
        </div>
        <div className="d-flex flex-column mt-2">
          <label htmlFor="note-edit">Note</label>
          <input
            type="text"
            className="form-control"
            name="note"
            id="note-edit"
            value={values?.note}
            onChange={handleInputChange}
            disabled={submit}
            required
          />
        </div>
        <div className="d-flex flex-column justify-content-start mt-2">
          <label htmlFor="done-edit">Done</label>
          <input
            className="align-self-start"
            type="checkbox"
            name="done"
            id="done-edit"
            checked={values?.done}
            value={values?.done}
            onChange={handleInputChange}
            disabled={submit}
          />
        </div>
        <button className="btn btn-primary mt-2" type="submit">
          {mode === "1" ? "Update" : "Add"}
        </button>
      </form>
      {mode === "1" && (
        <button
          className="btn btn-danger mt-2"
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
