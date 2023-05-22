import axios from 'axios'

import {
  POST_LOADING,
  ADD_POST,
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  CLEAR_POSTS,
  UPDATE_POST
} from './types'
import { data } from 'jquery'

export const create = (post) => async (dispatch) => {
  let tok = localStorage.getItem('userData').replaceAll('\"', '')
  
  let ret = "Bearer " + tok // Возвращаемый токен 
    await axios.post('https://localhost:44314/Recipe', post, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        'Content-Type': 'application/json',
        'Authorization': ret
      }
    })
    .then((res) => {
     if (res.ok === true)
     {
      const data = res.json()
     }
    })
}

export const getAll = (params) => async (dispatch) => {
  dispatch(setPostLoading(true))
  let tok = localStorage.getItem('userData').replaceAll('\"', '')
  let dataArr = []
  await axios
  .get('https://localhost:44314/Recipe')
  .then((res) => { 
    const count = res.data.$values.length
    let from = count - params.skip
    const to = from - params.limit + 1
    while (to <= from && from > 0)
    {
      axios
      .get(`https://localhost:44314/Recipe/getRecipe/${from}`)
      .then((data) => {
        dataArr.push(data.data)
      })
      --from
    }

    dispatch({
      type: GET_POST, 
      payload: {
        posts: dataArr, 
        totalCount: count
      }
  })
  })
}

export const getById = (id) => (dispatch) => {
  dispatch(setPostLoading(true))
  axios
    .get(`https://localhost:44314/Recipe/getRecipe/${id}`)
    .then((res) => {
      console.log('res', res.data)
      dispatch({
      type: GET_POST,
      payload: res.data
    })})
    .catch(() => dispatch(setPostLoading(false)))
}

export const remove = (id) => (dispatch) => {
  axios
    .delete(`/api/posts/${id}`)
    .then(() => dispatch({
      type: DELETE_POST,
      payload: id
    }))
}

export const createLike = (postId, TYPE) => (dispatch) => {
  axios
    .post(`https://localhost:44314/Recipe/LikeRecipe/${postId}`)
    .then((res) => dispatch({
      type: TYPE,
      payload: res.data
    }))
}

export const removeLike = (postId, likeId, TYPE) => (dispatch) => {
  axios
    .delete(`/api/posts/${postId}/likes/${likeId}`)
    .then((res) => dispatch({
      type: TYPE,
      payload: res.data
    }))
}

export const AddSave = (postId, saveId, TYPE) => (dispatch) => {
  axios
    .delete(`/api/posts/${postId}/save/${saveId}`)
    .then((res) => dispatch({
      type: TYPE,
      payload: res.data
    }))
}

export const RemoveSave = (postId, saveId, TYPE) => (dispatch) => {
  axios
    .delete(`/api/posts/${postId}/save/${saveId}`)
    .then((res) => dispatch({
      type: TYPE,
      payload: res.data
    }))
}


export const createComment = (postId, comment) => (dispatch) => {
  axios
    .post(`/api/posts/${postId}/comments`, comment)
    .then((res) => dispatch({
      type: UPDATE_POST,
      payload: res.data
    }))
}

export const removeComment = (postId, commentId) => (dispatch) => {
  axios
    .delete(`/api/posts/${postId}/comments/${commentId}`)
    .then((res) => dispatch({
      type: UPDATE_POST,
      payload: res.data
    }))
}

const clearPosts = () => ({
  type: CLEAR_POSTS
})

const setPostLoading = (isLoading) => ({
  type: POST_LOADING,
  payload: isLoading
})
