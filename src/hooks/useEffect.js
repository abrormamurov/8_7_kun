// actions/index.js
export const setUser = (user) => ({
  type: "SET_USER",
  payload: user,
});

// reducer.js
const initialState = {
  user: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
