import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import "./ProgrammingQuotes.css";
import axios from "axios";

import userAction from "../store/actions/userActions";

const ProgrammingQuotes = (props) => {
  const [formState, setFormState] = useState({
    first_name: "",
    email: "",
    last_name: "",
    id: "",
  });

  const [post, setPost] = useState([]);
  console.log({ post });
  useEffect(() => {
    props.userAction();
  }, []);

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
        });
      })
      .catch((err) => console.log(err.response));
  };

  const handleChange = (event) => {
    event.persist();
    const newFormData = {
      ...formState,
      [event.target.name]: event.target.value,
    };
    // validateChange(event);
    setFormState(newFormData);
  };

  // if (props.isFetching) {
  //   return <Loader />;
  // }
  // console.log(props.data, 'this is from inside')
  return (
    <div className="container">
      <h1>Post this plase</h1>
      {!props.isFetching &&
        props.data.map((user) => {
          return (
            <>
              <h2 key={user.id}>
                {user.first_name} {user.last_name}
              </h2>
              <p>{user.email}</p>
            </>
          );
        })}
      {post.map((person) => {
        return (
          <>
            <h2>
              {person.first_name} {person.last_name}
            </h2>
            <p>{person.email}</p>
          </>
        );
      })}

      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">
          First Name
          <input
            type="text"
            name="first_name"
            value={formState.name}
            onChange={handleChange}
          />
        </label>
        <br />

        <label htmlFor="last_name">
          Last Name
          <input
            type="text"
            name="last_name"
            value={formState.last_name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label htmlFor="email">
          email
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <button onClick={(event) => handleSubmit(event)}>Submit!</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log({ state });
  return {
    data: state.user.data,
    isFetching: state.user.isFetching,
  };
};

export default connect(mapStateToProps, { userAction })(ProgrammingQuotes);
