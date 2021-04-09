export const increment = (num: number) => {
  return {
    type: "increment",
    payload: {
      size: num,
    },
  };
};

export const dataFetched = () => {
  return {
    type: "data-fetched",
    payload: {
      fetched: true,
    },
  };
};
