import React from "react";
import { useDispatch } from "react-redux";
import useForm from "../../hooks/useForm";
import { login } from "../../actions/auth";

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
      console.log("not found");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="email">email:</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleInputChange}
          value={email}
        />
        <br />
        <label htmlFor="password">password:</label>
        <input
          type="text"
          id="password"
          name="password"
          onChange={handleInputChange}
          value={password}
        />
        <br />
        <input type="submit" value="Submit" />
        <button type="button" onClick={reset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;
