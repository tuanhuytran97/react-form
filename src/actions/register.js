export const save = (input) => {
    return {
      type: "SAVE",
      payload: input,
    };
};
export const del = (input) => {
  return {
    type: "DELETE",
    payload: input,
  };
};
export const edit = (input) => {
  return {
    type: "EDIT",
    payload: input,
  };
}
