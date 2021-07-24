import axios from "axios";
import { put, call, takeLatest, takeEvery } from "redux-saga/effects";
import { GET_USERS_REQUEST, GET_USERS_SUCCESS } from "../actions/userActions";

const getUsers = () => {
  return axios.get("https://reqres.in/api/users")
    .then((response) => ({ response }))
    .catch((error) => ({ error }));
};

// export const getUser = async () => {
//   try {
//     const data = await axios.get("https://reqres.in/api/users");
//     const modifiedData = data.map(() => ({}));
//     return modifiedData;
//   } catch (e) { }
// };

function* getUsersSaga() {
  const { response, error } = yield call(getUsers);
  if (response) {
    const data = yield response.data.data;
    yield put({ type: GET_USERS_SUCCESS, payload: data });
  } else {
    console.log("error: ", error.message);
  }
}

export default function* rootSaga() {
  yield takeLatest(GET_USERS_REQUEST, getUsersSaga);
}
