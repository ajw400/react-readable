import React from 'react'
import { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { Nav, NavLink, Table} from 'reactstrap'
import { PropTypes } from 'prop-types'
import Comment from './Comment'
import { timeConverter } from '../utils/helper'
import CommentForm from './CommentForm'
import ListHeader from './ListHeader'

class PostDetail extends Component {
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

  componentDidMount() {
    this.props.openPost(this.props.postId)
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
    this.setState({
      commentFormOpen: true,
      author: comment.author,
      body: comment.body,
      id: comment.id
    })
  }

  render() {
    const {
      posts,
      postId,
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
    console.log(this.props)
    const post = { ...posts[postId] }
     if (!post.id || post.deleted) {
        console.log("in if", post.id, post, post.deleted)
        alert("post not found")
        return <Redirect to='/' />
      }
      return (
        <Table>
            <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Date</th>
                    <th>Votes</th>
                    <th>Comments</th>
                  </tr>
            </thead>
          <tr>
            <td>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <Nav>
                <NavLink>
                <Link to="/">
                  back to list
                </Link>
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
                <NavLink href="#" onClick={() => {openPostForm(post); this.props.history.push('/')}}>
                  edit
                </NavLink>
                <NavLink href="#" onClick={() => removePost(post)}>
                  delete
                </NavLink>
              </Nav>
              <hr/>
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
                    key={comments[key].id}
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
        </Table>
      )
    }
  }


export default withRouter(PostDetail)
