import React, { Component } from 'react'
import Banner from './Banner'
import VisiblePostList from './VisiblePostList'
import { getPosts, getCategories } from '../utils/api'


class App extends Component {


  componentDidMount() {
    getPosts().then((posts) => {
      this.setState({ posts })
    })

    getCategories().then((categories) => {
      this.setState({ ...categories })
    })
  }

  render() {
    return (
      <div className='container'>
        <Banner />
        <VisiblePostList />
      </div>
      )
  }
}

export default App
