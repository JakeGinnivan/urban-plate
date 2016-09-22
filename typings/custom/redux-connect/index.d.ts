declare namespace __ReduxConnect {
  export var ReduxAsyncConnect: any
  export var reducer: any
}

declare module "redux-connect" {
  export = __ReduxConnect
} 
