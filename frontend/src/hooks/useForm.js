import { useState } from "react";

const useForm = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setError] = useState({});

  const handleChange = ({ value, name }) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const disableLoginButton = () => {
    const { username, password } = values;
    if (
      !username ||
      (username === undefined && !password) ||
      password.length < 6
    ) {
      return true;
    }
    return false;
  };
  return { values, handleChange, disableLoginButton };
};

export default useForm;
