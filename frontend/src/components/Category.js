import React from 'react'
import { Jumbotron, Button, Nav, NavItem, NavLink } from 'reactstrap'
import PropTypes from 'prop-types'

const Category = ({ categoryName, onCategoryClick }) => {
  return (
      <NavItem>
        <NavLink href="#" onClick={(e) => onCategoryClick(categoryName)}>{categoryName}</NavLink>
      </NavItem>
  )}

Category.propTypes = {
  onCategoryClick: PropTypes.func.isRequired,
  categoryName: PropTypes.string.isRequired
}

export default Category
