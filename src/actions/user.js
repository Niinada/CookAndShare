import axios from 'axios'

import { GET_USER, USER_LOADING } from './types'

export const getUserById = (id) => (dispatch) => {
  let tok = localStorage.getItem('userData').replaceAll('\"', '')
  let ret = "Bearer " + tok
  console.log(ret)
  console.log(id)
  dispatch(setUserLoading(true))
  axios
  .get(`https://localhost:44314/api/User/profile/${id}`,  {
    headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET",
    'Content-Type': 'application/json',
    'Authorization': ret
  }})
    .then((res) => {
      console.log(res)
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    })
    .catch(() => dispatch(setUserLoading(false)))
}

const setUserLoading = (isLoading) => ({
  type: USER_LOADING,
  payload: isLoading
})
