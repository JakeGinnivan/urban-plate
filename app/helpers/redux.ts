export interface Action<TPayload, TMeta> extends Redux.Action {
  readonly type: string
  readonly payload: TPayload
  readonly error?: string
  readonly meta?: TMeta
}
export interface ActionCreator<TStart, TSuccess, M> {
  readonly type: string
  (payload?: TStart, meta?: M): Action<TStart, M>
  readonly success: (payload?: TSuccess, meta?: M) => Action<TSuccess, M>
  readonly failed: (error: string) => Action<void, M>
}

export function actionCreator<TStart, TSuccess, TMeta>(type: string): ActionCreator<TStart, TSuccess, TMeta> {
  const success = (payload: TSuccess, meta?: TMeta): Action<TSuccess, TMeta> => ({ type: `${type}_SUCCESS`, payload, meta })
  const failed = (error: string): Action<void, TMeta> => ({ type: `${type}_FAILED`, payload: undefined })
  return Object.assign((payload:TStart, meta: TMeta):any => ({type, payload, meta}), {type, success, failed})
}

const i = <TStart, TSuccess, TMeta>(action: Action<any, any>, actionCreator: ActionCreator<TStart, TSuccess, TMeta>):
    action is Action<TStart, TMeta> => action.type === actionCreator.type
export const isType = Object.assign(i,
    {
      success: <TStart, TSuccess, TMeta>(action: Action<any, any>, actionCreator: ActionCreator<TStart, TSuccess, TMeta>):
        action is Action<TSuccess, TMeta> => action.type === actionCreator.type
    })


export const createNewState = <T>(currentState: T, newStateProps: T): T =>
  Object.assign({}, currentState, newStateProps)
