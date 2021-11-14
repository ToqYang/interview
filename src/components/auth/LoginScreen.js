import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../actions/auth";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const dbUsers = [
  { name: "John Doe", id: "0", email: "john@example.com", password: "124" },
  { name: "Jane Doe", id: "1", email: "jane@example.com", password: "124" },
];

const LoginScreen = () => {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    const { email, password } = values;
    console.log("email: ", email);
    console.log("pass", password);
    const existDb = dbUsers.filter(
      (user) => user.email === email && user.password === password
    );

    if (existDb.length > 0) {
      const user = existDb[0];
      const accessToken = (Math.random() + 1).toString(36).substring(7);
      dispatch(login({ name: user.name, id: user.id }, accessToken));
    } else {
      console.log("not found");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email",
            },
          ]}
        >
          <Input
            value={"sjshj"}
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginScreen;

// <div>
//   <form onSubmit={handleSubmit}>
//     <h1>Login</h1>
//     <label htmlFor="email">email:</label>
//     <input
//       type="email"
//       id="email"
//       name="email"
//       onChange={handleInputChange}
//       value={email}
//     />
//     <br />
//     <label htmlFor="password">password:</label>
//     <input
//       type="text"
//       id="password"
//       name="password"
//       onChange={handleInputChange}
//       value={password}
//     />
//     <br />
//     <input type="submit" value="Submit" />
//     <button type="button" onClick={reset}>
//       reset
//     </button>
//   </form>
// </div>
