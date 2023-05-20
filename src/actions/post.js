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

export const create = (post) => (dispatch) => {
  console.log(post)
  let tok = localStorage.getItem('userData').replaceAll('\"', '')
  console.log(`Bearer ${tok}`)
    fetch('https://localhost:44314/Recipe', {
      mode: 'no-cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tok}`
        },
      body: post
    }).then((res) => {
      console.log(res)
    })
}

export const getAll = (params) => (dispatch) => {

}

export const getById = (id) => (dispatch) => {
  dispatch(setPostLoading(true))
  axios
    .get(`/api/posts/${id}`)
    .then((res) => dispatch({
      type: GET_POST,
      payload: res.data
    }))
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
    .post(`/api/posts/${postId}/likes`)
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
