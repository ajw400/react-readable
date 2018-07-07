import React from 'react'
import { Nav, NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import { Component } from 'react'
import { addComment } from '../actions'

const CommentForm = ({ author, body, open, handleCommentSubmit, handleInputChange, closeForm }) => {
    if (open === true) {
    return (
      <form onSubmit={handleCommentSubmit}>
          <input
            name="author"
            value={author}
            type="text"
            placeholder="author"
            onChange={handleInputChange} />
        <br />
          <textarea
            name="body"
            placeholder="comment"
            value={body}
            onChange={handleInputChange} />
        <br />
        <Nav>
          <input type="submit" value="Submit" />
          <NavLink href="#" onClick={closeForm}>close</NavLink>
        </Nav>
      </form>
      )
  } else { return null }
}

export default CommentForm
