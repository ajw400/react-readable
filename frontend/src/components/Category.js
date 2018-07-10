import React from 'react'
import { Jumbotron, Button, Nav, NavItem, NavLink } from 'reactstrap'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Category = ({ categoryName, onCategoryClick }) => {
  return (
      <NavLink>
        <Link to={`/${categoryName}`}>{categoryName}</Link>
      </NavLink>
  )}

Category.propTypes = {
  onCategoryClick: PropTypes.func.isRequired,
  categoryName: PropTypes.string.isRequired
}

export default Category
