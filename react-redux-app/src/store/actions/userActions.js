import axios from "axios";
import React, { useState } from "react";
// thunks

// Redux is synchronous
// we need to perform an async operation

const userAction = () => {
  return (dispatch) => {
    dispatch({ type: "FETCH_QUOTE_START" });
    axios
      .get(`https://reqres.in/api/users`)
      .then((res) => {
        // console.log("what is this",res.data.data);
        dispatch({ type: "FETCH_QUOTE_SUCCESS", payload: res.data.data });
      })
      .catch((err) => {
        // message: err.response.data
        // status: err.response.status
        dispatch({
          type: "FETCH_QUOTE_FAILURE",
          payload: err,
        });
      });
  };
};

export default userAction;
