import React from 'react'
import { Component } from 'react'
import Post from './Post'
import CategorySelector from './CategorySelector'
import ListHeader from './ListHeader'
import { Table } from 'reactstrap'
import { PropTypes } from 'prop-types'
import PostForm from './PostForm'
import { RingLoader } from 'react-spinners'
import { Route } from 'react-router-dom'
import PostDetail from './PostDetail'

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

  getVisiblePosts(posts, category, postOrder) {
    let newposts = []
    if (category === 'all') {
      Object.keys(posts).map((key, index) => {
        if (!posts[key].deleted) {
          newposts.push(posts[key])
        }
      })
    } else {
      Object.keys(posts).map((key, index) => {
        if (posts[key].category === category && !posts[key].deleted){
          newposts.push(posts[key])
        }
      })
    }
    const sortedposts = newposts.sort((a, b) => (Number(b[postOrder]) - Number(a[postOrder])))
    return sortedposts
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
    const { fetchPosts, orderByDate, orderByVotes, removePost, isLoading, postArray, onSubmitComment, onSubmitPost, posts, removeComment, upvotePost, downvotePost, upvoteComment, downvoteComment, comments, categories, openPost, collapsePost, onCategoryClick, postOrder, expandedPostId } = this.props
    const { title, author, body, postFormOpen } = this.state
    return (
      <div>
      <Route exact path="/:category" render={(props) => (
            <div>
            <CategorySelector categories={categories} onCategoryClick={onCategoryClick} />
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
              category={props.match.params.category}
              open={postFormOpen}
            />
            <Table hover>
              <ListHeader
                orderByDate={orderByDate}
                orderByVotes={orderByVotes}
              />
              <tbody>
             {this.getVisiblePosts(posts, props.match.params.category, postOrder).map((post) => (
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
        )}/>
        <Route exact path="/" render={() => (
            <div>
            <CategorySelector categories={categories} />
            <PostForm
              onCategoryCLick={onCategoryClick}
              categories={categories}
              onSubmitPost={this.onSubmitPost}
              handleInputChange={this.handleInputChange}
              closePostForm={this.closePostForm}
              openPostForm={this.openPostForm}
              handlePostSubmit={this.handlePostSubmit}
              title = { title }
              author = { author }
              body = { body }
              category={"all"}
              open={postFormOpen}
            />
            <Table hover>
              <ListHeader
                orderByDate={orderByDate}
                orderByVotes={orderByVotes}
              />
              <tbody>
             {this.getVisiblePosts(posts, "all", postOrder).map((post) => (
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
        )}/>
        <Route path="/:category/:postId" render={(props) => (
          <PostDetail
                    post={posts[props.match.params.postId]}
                    category={props.match.params.category}
                    postId={props.match.params.postId}
                    removeComment={removeComment}
                    onSubmitComment={onSubmitComment}
                    openPost={openPost}
                    removePost={removePost}
                    upvoteComment={upvoteComment}
                    downvoteComment={downvoteComment}
                    upvotePost={upvotePost}
                    downvotePost={downvotePost}
                    comments={comments}
                    collapsePost={collapsePost}
                    openPostForm={this.openPostForm}
                    posts={posts}
                    />
          )}/>
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
