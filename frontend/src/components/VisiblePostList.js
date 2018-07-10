import { connect } from 'react-redux'
import { fetchPosts, openPost, removePost, orderByDate, orderByVotes, fetchComments, fetchCategories, submitPost, submitComment, removeComment, expandPost, collapsePost, setCategoryFilter, upvotePost, downvotePost, upvoteComment, downvoteComment } from '../actions'
import PostList from './PostList'
import { withRouter } from 'react-router-dom'

const getVisiblePosts = (posts, category, postOrder) => {
  let newposts = []
  if (category.categoryFilter === 'all') {
    Object.keys(posts).map((key, index) => {
      if (!posts[key].deleted) {
        newposts.push(posts[key])
      }
    })
  } else {
    Object.keys(posts).map((key, index) => {
      if (posts[key].category === category.categoryFilter && !posts[key].deleted){
        newposts.push(posts[key])
      }
    })
  }
  const sortedposts = newposts.sort((a, b) => (Number(b[postOrder]) - Number(a[postOrder])))
  return sortedposts
}

const mapStateToProps = state => {
  return {
    posts: state.posts,
    comments: state.comments,
    categories: state.categories.categories,
    expandedPostId: state.expandedPostId.expandedPostId,
    isLoading: state.isLoading,
    postOrder: state.postOrder.postOrder,
    postArray: getVisiblePosts(state.posts, state.categoryFilter, state.postOrder.postOrder)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCategoryClick: categoryName => {
      dispatch(setCategoryFilter(categoryName))
      dispatch(collapsePost(null))
    },
    fetchPosts: () => {
      dispatch(fetchPosts())
    },
    fetchComments: (id) => {
      dispatch(fetchComments(id))
    },
    orderByDate: (e) => {
      e.preventDefault()
      dispatch(orderByDate())
    },
    orderByVotes: (e) => {
      e.preventDefault()
      dispatch(orderByVotes())
    },
    fetchCategories: () => {
      dispatch(fetchCategories())
    },
    collapsePost: post => {
      dispatch(collapsePost(post.id))
    },
    openPost: postId => {
      dispatch(openPost(postId))
    },
    upvotePost: post => {
      dispatch(upvotePost(post.id))
    },
    downvotePost: post=> {
      dispatch(downvotePost(post.id))
    },
    upvoteComment: comment => {
      dispatch(upvoteComment(comment.id))
    },
    downvoteComment: comment => {
      dispatch(downvoteComment(comment.id))
    },
    onSubmitComment: comment => {
      dispatch(submitComment(comment))
    },
    removeComment: comment => {
      dispatch(removeComment(comment.id))
    },
    onSubmitPost: post => {
      dispatch(submitPost(post))
    },
    removePost: post => {
      dispatch(removePost(post))
    }
  }
}

const VisiblePostList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList))

export default VisiblePostList
