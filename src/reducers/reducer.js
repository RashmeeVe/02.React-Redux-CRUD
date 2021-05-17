import * as actions from "../actionTypes";

let lastId = 0;
const initialState = [];

function reducer(state = initialState, action) {
  if (action.type === actions.ADD_USER) {
    return [
      ...state,
      {
        id: ++lastId,
        empCode: action.payload.empCode,
        empName: action.payload.empName,
        empAge: action.payload.empAge,
        empProfession: action.payload.empProfession,
      },
    ];
  } else if (action.type === actions.REMOVE_USER) {
    return state.filter((user) => user.id !== action.payload.id);
  } else if (action.type === actions.UPDATE_USER) {
    let users = [...state];
    const updatedUsers = users.map((user, index) =>
      index === action.payload.indexOfIdToEdit
        ? {
            ...user,
            id: user.id,
            empCode: action.payload.empCode,
            empName: action.payload.empName,
            empAge: action.payload.empAge,
            empProfession: action.payload.empProfession,
          }
        : user
    );
    users = updatedUsers;
    return users;
  }

  return state;
}

export default reducer;
