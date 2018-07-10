import React from 'react'
import Category from './Category'
import { Jumbotron, Button, Nav } from 'reactstrap';
import PropTypes from 'prop-types'

const CategorySelector = ({ categories, onCategoryClick }) => {
  return (
    <div>
          <p>Select a category
        <Nav>
          {categories.map(cat => <Category key={cat} categoryName={cat} onCategoryClick={onCategoryClick} />)}
        </Nav>
        </p>
    </div>
  )
}

CategorySelector.propTypes = {
  categories: PropTypes.array.isRequired,
  onCategoryClick: PropTypes.func.isRequired
}

export default CategorySelector
