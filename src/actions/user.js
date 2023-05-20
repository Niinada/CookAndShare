import axios from 'axios'

import { GET_USER, USER_LOADING } from './types'

export const getUserById = (id) => (dispatch) => {
  console.log(id)
  let tok = localStorage.getItem('userData').replaceAll('\"', '')
  console.log(`Bearer ${tok}`)
  
  dispatch(setUserLoading(true))
  fetch(`https://localhost:44314/api/User/profile/${id}`, {
    mode: 'no-cors',
    method: 'GET',
    token: localStorage.getItem('userData'),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tok}`
      }
  })
    .then((res) =>{
      console.log(res)
     dispatch({
      type: GET_USER,
      payload: res
    })})
    .catch(() => dispatch(setUserLoading(false)))
}

const setUserLoading = (isLoading) => ({
  type: USER_LOADING,
  payload: isLoading
})
