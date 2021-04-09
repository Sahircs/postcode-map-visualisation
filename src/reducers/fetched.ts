interface Action {
  type: string;
  payload: {
    fetched: Boolean;
  };
}

const fetchedReducer = (state: boolean = false, action: Action) => {
  switch (action.type) {
    case "data-fetched":
        return action.payload.fetched;
    default:
      return state;
  }
};

export default fetchedReducer;
