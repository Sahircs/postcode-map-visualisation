interface Action {
  type: string;
  payload: {
    size: number;
  };
}

const counterReducer = (state: number = 0, action: Action) => {
  switch (action.type) {
    case "increment":
      return state + action.payload.size;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
};

export default counterReducer;
