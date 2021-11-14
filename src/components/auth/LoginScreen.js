import React from "react";
import { useDispatch } from "react-redux";
import useForm from "../../hooks/useForm";
import { login } from "../../actions/auth";
import Swal from "sweetalert2";

const dbUsers = [
  { name: "John Doe", id: "0", email: "john@example.com", password: "124" },
  { name: "Jane Doe", id: "1", email: "jane@example.com", password: "124" },
];

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [values, handleInputChange, reset] = useForm({
    email: "john@example.com",
    password: "124",
  });
  const { email, password } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    const existDb = dbUsers.filter(
      (user) => user.email === email && user.password === password
    );

    if (existDb.length > 0) {
      const user = existDb[0];
      const accessToken = (Math.random() + 1).toString(36).substring(7);
      dispatch(login({ name: user.name, id: user.id }, accessToken));
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Not found",
      });
    }
  };

  return (
    <form
      className="d-flex flex-column justify-content-center align-items-initial"
      onSubmit={handleSubmit}
    >
      <h1>Login</h1>
      <div className="mt-5">
        <label htmlFor="email">Email:</label>
        <input
          className="form-control"
          type="email"
          id="email"
          name="email"
          onChange={handleInputChange}
          value={email}
        />
      </div>
      <br />
      <div className="mt-2">
        <label htmlFor="password">Password:</label>
        <input
          className="form-control"
          type="text"
          id="password"
          name="password"
          onChange={handleInputChange}
          value={password}
        />
      </div>
      <br />
      <div className="d-flex flex-column mt-5">
        <button className="btn btn-primary" type="submit">
          Login
        </button>
        <button
          className="btn btn-warning mt-2"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            reset({ email: "", password: "" });
          }}
        >
          Reset Fields
        </button>
      </div>
    </form>
  );
};

export default LoginScreen;
