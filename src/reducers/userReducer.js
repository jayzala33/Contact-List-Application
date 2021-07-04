import * as userActions from '../actions/userActions';

const initialState = {
  userList: []
}

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.GET_USERS_SUCCESS:
      const users = action.payload;
      return {
        userList: users,
      }
    default:
      return state;
  }
}

export default UserReducer