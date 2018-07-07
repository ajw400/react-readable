import React from 'react'
import { Component } from 'react'
import { Link } from 'react'
import { Nav, NavLink} from 'reactstrap'
import { PropTypes } from 'prop-types'
import Comment from './Comment'
import { timeConverter } from '../utils/helper'
import Modal from 'react-modal'
import CommentForm from './CommentForm'



class Post extends Component {
  constructor(props) {
    super(props)

    this.state = {
      commentFormOpen: false,
      openComment: {},
      author: '',
      body: '',
    }

    this.closeCommentForm = this.closeCommentForm.bind(this);
    this.openCommentForm = this.openCommentForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleCommentSubmit(event) {
    event.preventDefault()
    this.props.onSubmitComment({...this.state, parentId: this.props.post.id})
    this.closeCommentForm()
  }

  closeCommentForm() {
    this.setState({
      commentFormOpen: false
    })
  }
  openCommentForm(comment) {
    console.log(comment)
    this.setState({
      commentFormOpen: true,
      author: comment.author,
      body: comment.body,
      id: comment.id
    })
  }

  render() {
    const { post,
      expandPost,
      upvoteComment,
      downvoteComment,
      upvotePost,
      downvotePost,
      collapsePost,
      expandedPostId,
      onSubmitComment,
      removeComment,
      removePost,
      openPostForm,
      comments} = this.props
    const { commentFormOpen } = this.state

    if (post.id !== expandedPostId) {
      return (
          <tr onClick={() => expandPost(post)}>
            <td>{post.title}</td>
            <td>{post.author}</td>
            <td>{timeConverter(post.timestamp)}</td>
            <td>{post.voteScore}</td>
            <td>{post.commentCount}</td>
          </tr>
        )
    } else {
      return (
          <tr>
            <td>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <Nav>
                <NavLink href="#" onClick={() => collapsePost(post)}>
                  collapse
                </NavLink>
                <NavLink href="#" onClick={() => upvotePost(post)}>
                  upvote
                </NavLink>
                <NavLink href="#" onClick={() => downvotePost(post)}>
                  downvote
                </NavLink>
                <NavLink href="#" onClick={() => this.openCommentForm({})}>
                  comment
                </NavLink>
                <NavLink href="#" onClick={() => openPostForm(post)}>
                  edit
                </NavLink>
                <NavLink href="#" onClick={() => removePost(post)}>
                  delete
                </NavLink>
              </Nav>
              <CommentForm
                postId={post.id}
                handleInputChange={this.handleInputChange}
                handleCommentSubmit={this.handleCommentSubmit}
                body={this.state.body}
                author={this.state.author}
                open={commentFormOpen}
                closeForm={this.closeCommentForm} />
              {Object.keys(comments).map((key, index) => {
                if (comments[key].parentId === post.id) {
                  return <Comment
                    upvoteComment={upvoteComment}
                    removeComment={removeComment}
                    editComment={this.openCommentForm}
                    downvoteComment={downvoteComment}
                    comment={comments[key]} />
                }
              })}
            </td>
            <td>{post.author}</td>
            <td>{timeConverter(post.timestamp)}</td>
            <td>{post.voteScore}</td>
            <td>{post.commentCount}</td>
          </tr>
      )
    }
  }
}

export default Post
