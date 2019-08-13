import { createAction } from '../../utils/utils';
import { actionTypes } from './constants';
import { requestProductByDate, putNewData } from '../../utils/requests';

const addProductByDate = createAction(actionTypes.ADD_PRODUCT_BY_DATE);
export const addNewDate = createAction(actionTypes.ADD_FETCH_SUCCESS);

export const updateData = (token, data) => dispatch => {
  putNewData(token, data)
    .then(answ => {
      dispatch(addNewDate(answ.data.userData));
      return true;
    })
    .catch(err => {
      console.error('Trouble', err);
    });
};

export const getProductByDate = (date, token) => dispatch =>
  requestProductByDate(date, token)
    .then(({ data }) => {
      dispatch(addProductByDate(data.products));
      return true;
    })
    .catch(({ error }) => error);
