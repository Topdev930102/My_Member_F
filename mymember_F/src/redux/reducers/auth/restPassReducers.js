const initState = {
  status: null,
  values: "",
};

export const resetPass = (state = initState, action) => {
  switch (action.type) {
    case "RESET_PASS_OTP":
      return { ...state, status: action.payload };
    case "RESET_PASS":
      return { ...state, status: action.payload };

    default: {
      return state;
    }
  }
};
