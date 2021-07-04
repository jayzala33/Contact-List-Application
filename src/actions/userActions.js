export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';

export const getUser = () => {
  return { type:  GET_USERS_REQUEST};
};

export const getUserSuccess = (payload) => {
  return { type: GET_USERS_SUCCESS, payload };
};