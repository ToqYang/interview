import React, { useState, useContext, useCallback, useEffect } from "react";
import useForm from "../../hooks/useForm";
import axios from "axios";
import { ListContext } from "../../store/context";
import { handleConfigRequest, handlePostPut } from "../../config/handleApi";
import { Form, Row, Col, Button, Input } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { Checkbox } from "antd";

const FormTodo = ({ mode = "0", closeModal = null }) => {
  const { data, setData, currSelect, setCurrSelect } = useContext(ListContext);
  const [submit, setSubmit] = useState(false);
  const [form] = Form.useForm();

  const submitFinish = useCallback(() => {
    setSubmit(false);
    if (closeModal !== null) {
      closeModal();
      setCurrSelect({});
    }
  }, [closeModal, setCurrSelect]);

  useEffect(() => {
    if (mode === "1") {
      form.setFieldsValue({ ...currSelect });
    }
  }, [currSelect]);

  const makeEdit = useCallback(() => {
    const valuesForm = {
      name: form.getFieldValue("name"),
      done: form.getFieldValue("done") ?? false,
      note: form.getFieldValue("note"),
      _id: form.getFieldValue("_id"),
    };
    const { opt, newObj } = handleConfigRequest(valuesForm, mode);
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
        form.resetFields();
      });
  }, [data, currSelect, mode, setData, submitFinish]);

  const onFinish = () => {
    setSubmit(true);
    makeEdit();
  };

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        layout="horizontal"
        className="todo-form"
      >
        <Row gutter={20}>
          <Col xs={24} sm={24} md={17} lg={20} xl={20}>
            <Form.Item
              name={"name"}
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input
                disabled={submit}
                placeholder="Name of the owner of the note"
              />
            </Form.Item>
            <Form.Item
              name={"note"}
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input disabled={submit} placeholder="Write a note" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={17} lg={20} xl={20}>
            <Form.Item valuePropName="checked" name={"done"}>
              <Checkbox disabled={submit} defaultValue={["false"]}>
                Done
              </Checkbox>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={7} lg={10} xl={10}>
            <Button type="primary" htmlType="submit" block>
              <PlusCircleFilled />
              {mode === "1" ? "Submit" : "Add todo"}
            </Button>
          </Col>
        </Row>
      </Form>
      {mode === "1" && (
        <Button
          type="primary"
          onClick={(e) => {
            e.preventDefault();
            closeModal();
            setCurrSelect({});
          }}
        >
          Close
        </Button>
      )}
    </>
  );
};

export default FormTodo;

// <div>
//   <form
//     onSubmit={(e) => {
//       e.preventDefault();
//       setSubmit(true);
//       makeEdit();
//       reset({
//         _id: 0,
//         done: false,
//         note: "",
//         name: "",
//       });
//     }}
//   >
//     <label htmlFor="name-edit">Name</label>
//     <input
//       type="text"
//       name="name"
//       id="name-edit"
//       value={values?.name}
//       onChange={handleInputChange}
//       disabled={submit}
//     />
//     <label htmlFor="note-edit">Note</label>
//     <input
//       type="text"
//       name="note"
//       id="note-edit"
//       value={values?.note}
//       onChange={handleInputChange}
//       disabled={submit}
//     />
//     <label htmlFor="done-edit">Done</label>
//     <input
//       type="checkbox"
//       name="done"
//       id="done-edit"
//       checked={values?.done}
//       value={values?.done}
//       onChange={handleInputChange}
//       disabled={submit}
//     />
//     <button type="submit">Submit</button>
//   </form>
//   {mode === "1" && (
//     <button
//       type="button"
//       onClick={(e) => {
//         e.preventDefault();
//         setCurrSelect({});
//         closeModal();
//       }}
//     >
//       Close
//     </button>
//   )}
// </div>
