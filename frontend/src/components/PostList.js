import React from 'react'
import { Component } from 'react'
import Post from './Post'
import CategorySelector from './CategorySelector'
import ListHeader from './ListHeader'
import { Table } from 'reactstrap'
import { PropTypes } from 'prop-types'
import PostForm from './PostForm'
import { RingLoader } from 'react-spinners'

class PostList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postFormOpen: false,
      author: '',
      title: '',
      body: '',
      postId: '',
      category: '',
    }

    this.openPostForm = this.openPostForm.bind(this);
    this.closePostForm = this.closePostForm.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handlePostSubmit = this.handlePostSubmit.bind(this)

  }

  openPostForm(post = {}) {
    if (post.author) {
      this.setState({
        ...post,
        postFormOpen: true
      })
    } else {
      this.setState({
        author: '',
        title: '',
        category: '',
        body: '',
        postFormOpen: true })
    }
  }

  closePostForm(post = {}) {
    this.setState({
      postFormOpen: false
    })
  }

  componentDidMount() {
    this.props.fetchPosts()
    this.props.fetchCategories()
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    console.log(event.target.name)
    this.setState({
      [name]: value
    })
  }

  handlePostSubmit(event) {
    event.preventDefault()
    this.props.onSubmitPost({...this.state})
    this.closePostForm()
  }

  render() {
    const { fetchPosts, orderByDate, orderByVotes, removePost, isLoading, postArray, onSubmitComment, onSubmitPost, posts, removeComment, upvotePost, downvotePost, upvoteComment, downvoteComment, comments, categories, openPost, collapsePost, onCategoryClick, expandedPostId } = this.props
    const { title, author, body, category, postFormOpen } = this.state
    return (
      <div>
      <CategorySelector onCategoryClick={onCategoryClick} categories={categories} />
      <PostForm
        categories={categories}
        onSubmitPost={this.onSubmitPost}
        handleInputChange={this.handleInputChange}
        closePostForm={this.closePostForm}
        openPostForm={this.openPostForm}
        handlePostSubmit={this.handlePostSubmit}
        title = { title }
        author = { author }
        body = { body }
        category={category}
        open={postFormOpen}
      />
      <Table hover>
        <ListHeader
          orderByDate={orderByDate}
          orderByVotes={orderByVotes}
        />
        <tbody>
       {postArray.map((post) => (
            <Post
              removeComment={removeComment}
              key={post.id}
              onSubmitComment={onSubmitComment}
              expandPost={openPost}
              removePost={removePost}
              upvoteComment={upvoteComment}
              downvoteComment={downvoteComment}
              upvotePost={upvotePost}
              downvotePost={downvotePost}
              comments={comments}
              collapsePost={collapsePost}
              expandedPostId={expandedPostId}
              openPostForm={this.openPostForm}
              post={posts[post.id]} />
            ))}
        </tbody>
      </Table>
      </div>
      )
  }
}

PostList.propTypes = {
  posts: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  onPostClick: PropTypes.func.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
  expandedPostId: PropTypes.string,
  onSubmitComment: PropTypes.func.isRequired
}

export default PostList
