import { editPost, remove, editComment, getPosts, getCategories, getComments, newPost, newComment, vote } from '../utils/api'
import { guidGenerator } from '../reducers'
export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_POST = 'REMOVE_POST'
export const SUBMIT_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const SET_CATEGORY_FILTER = 'SET_CATEGORY_FILTER'
export const EXPAND_POST = 'EXPAND_POST'
export const COLLAPSE_POST = 'COLLAPSE_POST'
export const UPVOTE_POST = 'UPVOTE_POST'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const FETCH_POSTS = "FETCH_POSTS"
export const LOADING = "LOADING"
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const GET_COMMENTS = 'GET_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const OPEN_POST = 'OPEN_POST'
export const ORDER_BY_DATE = 'ORDER_BY_DATE'
export const ORDER_BY_VOTES = 'ORDER_BY_VOTES'
export const MARK_POST_DELETED = 'MARK_POST_DELETED'

export function orderByVotes() {
  return {
    type: ORDER_BY_VOTES
  }
}

export function orderByDate() {
  return {
    type: ORDER_BY_DATE
  }
}

export function fetchComments(id) {
  return (dispatch) => {
    dispatch(loading(true))
    return getComments(id)
      .then(comments => dispatch(receiveComments(comments)))
      .then(() => dispatch(loading(false)))
  }
}

export function fetchCategories() {
  return (dispatch) => {
    dispatch(loading(true))
    getCategories()
    .then(cats => dispatch(receiveCategories(cats)))
    .then(() => dispatch(loading(false)))
  }
}

export function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments
  }
}

export function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories
  }
}

export function fetchPosts() {
  return (dispatch) => {
    dispatch(loading(true))
    getPosts()
    .then(posts => dispatch(receivePosts(posts)))
    .then(() => dispatch(loading(false)))
  }
}

export function loading(bool) {
  return {
    type: LOADING,
    bool
  }
}

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  }
}

export function upvotePost (postId) {
  return (dispatch) => {
    vote("posts", postId, {"option": "upVote"})
    .then(() => dispatch({
      type: UPVOTE_POST,
      postId
    }))
  }
}

export function downvotePost (postId) {
  return (dispatch) => {
    vote("posts", postId, {"option": "downVote"})
    .then(() => dispatch({
      type: DOWNVOTE_POST,
      postId
    }))
  }
}

export function downvoteComment (commentId) {
  return (dispatch) => {
    vote("comments", commentId, {'option': 'downVote'})
    .then(() => dispatch({
      type: DOWNVOTE_COMMENT,
      commentId
    }))
  }
}

export function upvoteComment (commentId) {
  return (dispatch) => {
    vote("comments", commentId, {'option': 'upVote'})
    .then(() => dispatch({
      type: UPVOTE_COMMENT,
      commentId
    }))
  }
}

export function  setCategoryFilter (category) {
  return {
    type: SET_CATEGORY_FILTER,
    category
  }
}

export function openPost (postId) {
  return (dispatch) => {
    getComments(postId)
    .then(comments => dispatch(receiveComments(comments)))
    .then(post => dispatch(expandPost(postId)))
  }
}

export function expandPost (postId) {
  return {
    type: EXPAND_POST,
    postId
  }
}

export function collapsePost () {
  return {
    type: COLLAPSE_POST,
  }
}

export function submitPost ({ title, author, body, category, id }) {
  return (dispatch) => {
    if (!id) {
      newPost({
        id: guidGenerator(),
        title,
        author,
        body,
        category,
        timestamp: Date.now(),
      })
      .then(() => dispatch(fetchPosts())) }
    else {
      editPost({
        id,
        title,
        author,
        body,
        category
      })
      .then(() => dispatch(fetchPosts())) }
  }
}

export function removePost (post) {
  return (dispatch) => {
    remove("posts", post.id)
    .then(() => dispatch(collapsePost()))
    .then(() => dispatch(fetchPosts()))
    .then(() => dispatch(markPostDeleted(post.id)))
  }
}

export function markPostDeleted(postId) {
  return {
    type: MARK_POST_DELETED,
    postId
  }
}

export function submitComment ({ parentId, body, author, id }) {
  return (dispatch) => {
    if (!id) {
      newComment({
        id: guidGenerator(),
        timestamp: Date.now(),
        author,
        body,
        parentId
      })
      .then(() => dispatch(fetchComments(parentId)))
      .then(() => dispatch(fetchPosts())) }
    else {
      editComment({
        id,
        author,
        body
      })
      .then(() => dispatch(fetchComments(parentId)))}
  }
}

export function removeComment (commentId) {
  return {
    type: REMOVE_COMMENT,
    commentId
  }
}

