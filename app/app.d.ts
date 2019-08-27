import { IIngredientState } from './ingredients.redux'
import { IAppState } from './app.redux'

export interface ISiteState {
  app: IAppState
  ingredients: IIngredientState
}

export interface IStore extends Redux.Store<ISiteState> {

}

export type Dispatch = Redux.Dispatch<IStore>
