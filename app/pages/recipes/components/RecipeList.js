import React from 'react'
import { Pager } from 'react-bootstrap'
import { Link } from 'react-router'
import styles from './RecipeList.module.scss'

const RecipeList = ({ recipes }) => (
  <div>
    {recipes.length === 0 && <div>No recipes</div>}
    {recipes.map(r => (
      <Link to={`/recipes/${r.id}`} key={r.id}>{r.name}</Link>
    ))}
    <Pager>
      <Pager.Item previous href='#'>&larr; Previous Page</Pager.Item>
      <Pager.Item next href='#'>Next Page &rarr; </Pager.Item>
    </Pager>
  </div>
)

RecipeList.propTypes = {
  recipes: React.PropTypes.array
}

export default RecipeList
