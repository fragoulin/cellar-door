import { ActionCreatorsMapObject } from 'redux'

export function createActionPayload<TypeAction, TypePayload> (actionType: TypeAction): (payload: TypePayload) => ActionsWithPayload<TypeAction, TypePayload> {
  return (p: TypePayload): ActionsWithPayload<TypeAction, TypePayload> => {
    return {
      payload: p,
      type: actionType
    }
  }
}
export function createAction<TypeAction> (actionType: TypeAction): () => ActionsWithoutPayload<TypeAction> {
  return (): ActionsWithoutPayload<TypeAction> => {
    return {
      payload: {},
      type: actionType
    }
  }
}
export interface ActionsWithPayload<TypeAction, TypePayload> {
  type: TypeAction;
  payload: TypePayload;
}

export interface ActionsWithoutPayload<TypeAction> {
  type: TypeAction;
  payload: {};
}

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;
