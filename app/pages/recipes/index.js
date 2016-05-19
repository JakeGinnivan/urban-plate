import React from 'react'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-connect'
import { Pager, PageItem } from 'react-bootstrap'
import { loadRecipes } from '../../app.redux'
import { Link } from 'react-router'

@asyncConnect([{
  promise: (props) => Promise.all([
    props.store.getState().app.recipesLoaded ? Promise.resolve() : props.store.dispatch(loadRecipes())
  ])
}])
@connect(state => ({
  recipes: state.app.recipes || []
}))
export default class RecipeIndex extends React.Component {
  render() {
    return (
      <div>
        {this.props.recipes.length === 0 && <div>No recipes</div>}
        {this.props.recipes.map(r => <Link to={`/recipes/${r.id}`}>{r.name}</Link>)}
        <Pager>
          <PageItem previous href='#'>&larr; Previous Page</PageItem>
          <PageItem next href='#'>Next Page &rarr; </PageItem>
        </Pager>
      </div>
    )
  }
}
