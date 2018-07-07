import React from 'react'
import { NavLink } from 'reactstrap'

const ListHeader = ({ orderByDate, orderByVotes }) => {
  return (
    <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th><NavLink href="" onClick={orderByDate}>Date</NavLink></th>
            <th><NavLink href="" onClick={orderByVotes}>Votes</NavLink></th>
            <th>Comments</th>
          </tr>
    </thead>

    )
}

export default ListHeader
