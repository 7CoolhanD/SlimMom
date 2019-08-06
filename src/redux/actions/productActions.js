import { STORE_ADD, ADD_FETCH_SUCCESS } from './constants';

export const addStore = data => ({
  type: STORE_ADD,
  payload: data
});

export const fetchSuccess = data => ({
  type: ADD_FETCH_SUCCESS,
  payload: data
});

// export const asyncCreateNew = (userData, token) => dispatch => {
//   fetch(`https://slim-moms.goit.co.ua/api/v1`, {
//     method: 'POST',
//     body: JSON.stringify(userData),
//     headers: {
//       'content-type': 'application/json',
//       Authorization: token
//     }
//   })
//     .then(response => {
//       response.json().then(data => {
//         dispatch(fetchSuccess(data.result));
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };
