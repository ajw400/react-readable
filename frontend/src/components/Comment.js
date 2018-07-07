import React from 'react'
import { Nav, NavLink } from 'reactstrap'
import { timeConverter } from '../utils/helper'

const Comment = ({ comment, upvoteComment, downvoteComment, editComment, removeComment }) => {
  if (comment.deleted !== true) {
  return (
    <div>
      <i>Author: {comment.author}  | Date: {timeConverter(comment.timestamp)}  |  Votes: {comment.voteScore}</i>
      <p>{comment.body}
      <Nav>
        <NavLink href="#" onClick={() => upvoteComment(comment)}>upvote </NavLink>
        <NavLink href="#" onClick={() => downvoteComment(comment)}>downvote</NavLink>
        <NavLink href="#" onClick={() => editComment(comment)}>edit</NavLink>
        <NavLink href="#" onClick={() => removeComment(comment)}>delete</NavLink>
      </Nav>
      </p>
    </div>
    )
  } else { return null }
}

export default Comment
