const initialState = {
  data: [],
  isFetching: false,
  error: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_QUOTE_START":
      return {
        ...state,
        isFetching: true,
        error: "",
      };
    case "FETCH_QUOTE_SUCCESS":
      // console.log("state",state)
      // console.log("action.payload.data",action.payload.data)
      // const ranNum = Math.floor(Math.random()*(500-0)) + 0;
      return {
        ...state,
        data: action.payload,
        isFetching: false,
        error: "",
      };
    case "FETCH_QUOTE_FAILURE":
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      };
    default:
      return state;
  }
};
