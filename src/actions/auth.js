import axios from 'axios'
import jwtDecode from 'jwt-decode'

import { SET_CURRENT_USER } from './types'
import setAuthToken from '../utils/setAuthToken'
import user from '../reducers/user'

export const register = (userData, history) => () => {
    fetch('https://localhost:44314/api/User/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
        }
    })
    .then(() => history.push('/login'))                                                                                                                                                                                                
}

export function checkLogin(dispatch) {
  const tokenDetails = localStorage.getItem('userData');
  let token = '';
  if (!tokenDetails) {
    dispatch(logout());
    return;
  }
  const decoded = jwtDecode(tokenDetails)
  dispatch(setCurrentUser(decoded))
}

export function SaveToken(token) {
  localStorage.setItem('userData', JSON.stringify(token));
}

function DeleteToken() {
  localStorage.removeItem('userData')
}

export const login = (userData) => (dispatch) => {
  console.log(userData)
  fetch('https://localhost:44314/api/User/login', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json'
      }})
      .then(response => response.json())
      .then(token => {
        SaveToken(token.token)
        const decoded = jwtDecode(token.token)
        console.log(decoded)
        dispatch(setCurrentUser(decoded))
      })
      .catch(error => console.error('Unable to get item', error))
}

export const logout = () => (dispatch) => {
  DeleteToken()
  dispatch(setCurrentUser({}))
}

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user
})
