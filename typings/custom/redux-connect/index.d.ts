declare namespace __ReduxConnect {
  export var ReduxAsyncConnect: any
  export var reducer: any
  export var asyncConnect: any
}

declare module "redux-connect" {
  export = __ReduxConnect
}
