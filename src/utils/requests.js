import axios from 'axios';
import {} from '../redux/actions/auth';
import * as api from './entyPoints';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

export const setToken = token => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});

// Example
export const fetchCompleteTask = (token, task) => {
  return axios.post(api.url.updateTask(), { ...task, isDone: true }, setToken(token)).catch(err => console.log(err));
};

export const DeleteProdByDay = (token, id) => {
  return axios
    .delete(api.url.deleteProductsByDay() + id, setToken(token))
    .then(resp => {
      if (resp.data.status !== 'success') {
        throw new Error('sdasDDDDDDda');
      }
      return resp.data;
    })
    .catch(err => {
      console.log('ANSWER ERROR');
      console.log(err);
      console.log(err.message);
      return err;
    });
};
export const requestRegister = cred =>
  axios
    .post(api.url.registerUser(), cred)
    // TODO Add error handlers

    .then(data => data)
    .catch(({ error }) => console.log(error));

export const requestLogin = cred =>
  axios
    .post(api.url.loginUser(), cred)
    // TODO Add error handlers

    .then(data => data)
    .catch(({ error }) => console.log(error));

export const requestProductByDate = (date, token) =>
  axios
    .get(api.url.productsByDate(date), setToken(token))
    // TODO Add error handlers
    .then(data => data)
    .catch(({ error }) => console.log(error));

export const requestUserData = token =>
  axios
    .get(api.url.userData(), setToken(token))
    // TODO Add error handlers

    .then(data => data)
    .catch(({ error }) => console.log(error));
