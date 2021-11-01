import { useState, useEffect } from "react";

const useForm = (callback, validate, type) => {
  const [values, setValues] = useState(
    type 
      ? {
          email: "",
          password: "",
        }
      : {
          username: "",
          email: "",
          password: "",
          password2: "",
        }
  );
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
    // console.log("data-->", values);
    const article = {
      email: values.email,
      password: values.password,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(article),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:5000/api/users/login", options)
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
  const handleSignup = (e) => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
    // console.log("data-->", values);
    const article = {
      name: values.username,
      email: values.email,
      password: values.password,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(article),
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("hgjhd", type == "isLogin");
    fetch("http://localhost:5000/api/users", options)
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
  const handleSubmit = (e) => {
    handleSignup(e);
    e.preventDefault();
    // console.log("gfhg",type =="isLogin" )
    type  ?  handleSignup(e) : handleLogin(e)
    // handleLogin(e)
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
