export const registerReducer = (state = [], action) => {
    switch (action.type) {
      case "SAVE":
        return [...state,action.payload];
      case "DELETE":
        return state.filter(person => person.id !== action.payload);
      case "EDIT":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default registerReducer;