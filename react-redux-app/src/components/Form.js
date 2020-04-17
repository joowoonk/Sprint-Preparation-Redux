import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import styled from "styled-components";
import ProgrammingQuotes from "./ProgrammingQuotes";
// import "./form.styles.css"

// const formSchema = yup.object().shape({
//     name: yup.string().required("Name is a required field."),
//     email: yup
//       .string()
//       .email("Must be a valid email address")
//       .required("Must include email address"),
//     password: yup.string().required("Password is a required field").min(4, "your password needs more 4 letters").matches(/(^(?=.*[!@#$%^&*]))/, "Your Password is required special characters"),
//     terms: yup.boolean().oneOf([true], "Please agree to terms of use"),
//     // positions: yup.string()
// })

const Title = styled.div`
  font-size: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /* font-family: 'Fjalla One', sans-serif; */
  margin-top: 3%;
  /* <link href="https://fonts.googleapis.com/css?family=Fjalla+One|Inconsolata&display=swap" rel="stylesheet"> */
`;

const Button = styled.button`
  background: rgb(219, 112, 147);
  color: white;
  padding: 0.25em 1em;
  border: 2px solid rgb(219, 112, 147);
  border-radius: 3px;
  margin: 3% 0;
  font-size: 1.5rem;
  &:hover {
    background: white;
    color: rgb(219, 112, 147);
    border: 2px solid white;
  }
  &:disabled {
    background-image: none;
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.1);
    cursor: not-allowed;
  }
`;

const TheForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 300px;
  margin: 0 auto;
`;
const Label = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
  font-size: 1rem;
`;

// backgroundImage = "url('img_tree.png');

const Form = (props) => {
  const [formState, setFormState] = useState({
    first_name: "",
    email: "",
    last_name: "",
    id: "",
    // position: ""
  });

  const [errors, setErrors] = useState({
    first_name: "",
    email: "",
    last_name: "",
    id: "",
    // position: ""
  });

  const [post, setPost] = useState([]);
  console.log({ post });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then((res) => {
        setPost([...post, res.data]);
        console.log("success", post);

        setFormState({
          first_name: "",
          email: "",
          last_name: "",
          id: "",
          // position: ""
        });
      })
      .catch((err) => console.log(err.response));
  };

  const handleChange = (event) => {
    event.persist();
    const newFormData = {
      ...formState,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    };
    // validateChange(event);
    setFormState(newFormData);
  };
  console.log(errors);
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <form htmlFor="first_name">
            First Name
            <input
              type="text"
              name="first_name"
              value={formState.name}
              onChange={handleChange}
            />
          </form>
          <br />

          <form htmlFor="last_name">
            Last Name
            <input
              type="text"
              name="last_name"
              value={formState.last_name}
              onChange={handleChange}
            />
          </form>
          <br />

          <form htmlFor="email">
            password
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
          </form>
          <br />

          <button onClick={(event) => handleSubmit(event)}>Submit!</button>
        </form>
      </div>
      {/* <Pre>{JSON.stringify(post, null, 2)}</Pre> */}
      <ProgrammingQuotes post={post} />
    </div>
  );
};

export default Form;
