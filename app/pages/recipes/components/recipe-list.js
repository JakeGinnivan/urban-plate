import React from 'react'
import { Pager, PageItem } from 'react-bootstrap'
import { Link } from 'react-router'
import styles from './recipe-list.module.scss'

const RecipeList = ({ recipes }) => (
  <div>
    {recipes.length === 0 && <div>No recipes</div>}
    {recipes.map(r => (
      <Link to={`/recipes/${r.id}`} key={r.id}>{r.name}</Link>
    ))}
    <Pager>
      <PageItem previous href='#'>&larr; Previous Page</PageItem>
      <PageItem next href='#'>Next Page &rarr; </PageItem>
    </Pager>
  </div>
)

RecipeList.propTypes = {
  recipes: React.PropTypes.array
}

export default RecipeList
