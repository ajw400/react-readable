import { combineReducers } from 'redux'
import {
  ADD_POST,
  ADD_COMMENT,
  SET_CATEGORY_FILTER,
  UPVOTE_POST,
  DOWNVOTE_POST,
  REMOVE_POST,
  COLLAPSE_POST,
  EXPAND_POST,
  REMOVE_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  LOADING,
  RECEIVE_POSTS,
  RECEIVE_CATEGORIES,
  RECEIVE_COMMENTS,
  ORDER_BY_DATE,
  ORDER_BY_VOTES,
  MARK_POST_DELETED
   } from '../actions'

export const guidGenerator = () => {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function categoryFilter(state = {categoryFilter: 'all'}, action) {
  switch (action.type) {
    case SET_CATEGORY_FILTER:
      return {
        categoryFilter: action.category
      }
    default:
      return state
  }
}

function categories(state = {categories: []}, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      const cats = action.categories.map(cat => cat.name)
      cats.push("all")
      return {
        categories: cats
      }
    default:
      return state
  }
}

function expandedPostId(state = {expandedPostId: null}, action){
  switch (action.type) {
    case EXPAND_POST:
      return {
        ...state,
        expandedPostId: action.postId,
      }
    case COLLAPSE_POST:
      return {
        ...state,
        expandedPostId: null
      }
    default:
      return state
  }
}

function postOrder(state = "timestamp", action){
  switch (action.type) {
    case ORDER_BY_DATE:
      return {
        ...state,
        postOrder: "timestamp"
      }
    case ORDER_BY_VOTES:
      return {
        ...state,
        postOrder: "voteScore"
      }
    default:
      return state
  }
}

function isLoading(state = false, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: action.bool
      }
    default:
      return state
  }
}

function posts(state = {}, action){
  switch (action.type) {
    case DOWNVOTE_POST:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          voteScore: state[action.postId].voteScore - 1
          }
        }
    case UPVOTE_POST:
      return {
        ...state,
        [action.postId]: {
          ...state[action.postId],
          voteScore: state[action.postId].voteScore + 1
          }
        }
    case ADD_POST:
      const { title, body, author, category, postId } = action
      const id = postId || guidGenerator()
      return {
        ...state,
        [id]: {
          ...state[id],
          title,
          body,
          author,
          category,
          timestamp: Date.now(),
          voteScore: 0
        }
      }
    case RECEIVE_POSTS:
      var result = action.posts.reduce(function(obj,item){
        obj[item.id] = {...item};
        return obj;
      }, {});
      return {
        ...state,
        ...result
      }
    case MARK_POST_DELETED:
      return {
        ...state,
        [action.postId]: {
            ...state[postId],
            deleted: true
        }
      }
    default:
      return state
  }
}


function comments(state = {}, action) {
  switch (action.type) {
    case DOWNVOTE_COMMENT:
      return {
        ...state,
        [action.commentId]: {
          ...state[action.commentId],
          voteScore: state[action.commentId].voteScore - 1
          }
        }
    case UPVOTE_COMMENT:
      return {
        ...state,
        [action.commentId]: {
          ...state[action.commentId],
          voteScore: state[action.commentId].voteScore + 1
          }
        }
    case ADD_COMMENT:
      const { author, body, parentId, commentId } = action
      const id = commentId || guidGenerator()
      return {
        ...state,
        [id]: {
          id,
          body,
          author,
          parentId,
          timestamp: Date.now(),
          voteScore: 0,
          deleted: false
        }
      }
    case REMOVE_COMMENT:
      return {
        ...state,
        [action.commentId]: {
          ...state[action.commentId],
          deleted: true
        }
      }
    case RECEIVE_COMMENTS:
      console.log("action.comments", action.comments)
      const result = action.comments.reduce(function(obj,item){
        obj[item.id] = {...item};
        return obj;
      }, {});
      return {
        ...state,
        ...result
      }
    default:
      return state
  }
}

const reducer = combineReducers({
  posts,
  postOrder,
  comments,
  categories,
  isLoading,
  categoryFilter,
  expandedPostId
})

export default reducer
