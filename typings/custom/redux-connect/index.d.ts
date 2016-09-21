declare namespace __ReduxConnect {
  export var ReduxAsyncConnect: any
}

declare module "redux-connect" {
  export = __ReduxConnect
} 
