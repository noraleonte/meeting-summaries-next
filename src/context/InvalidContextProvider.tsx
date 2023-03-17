import { createContext, ReactElement, useReducer } from 'react'

type InvalidContextStateType = { invalidContext: boolean }

const initInvalidContextState: InvalidContextStateType = {
  invalidContext: true,
}

export type InvalidContextReducerActionType = {
  payload?: boolean
}

const reducer = (
  state: InvalidContextStateType,
  action: InvalidContextReducerActionType
): InvalidContextStateType => {
  if (!action.payload) {
    return { invalidContext: !state.invalidContext }
  }
  return { invalidContext: action.payload }
}

const useInvalidContextContext = (initState: InvalidContextStateType) => {
  const [state, dispatch] = useReducer(reducer, initState)

  const { invalidContext } = state

  return { dispatch, invalidContext }
}

export type UseInvalidContextContextType = ReturnType<
  typeof useInvalidContextContext
>

const initInvalidContextContextState: UseInvalidContextContextType = {
  dispatch: () => {},
  invalidContext: true,
}

const InvalidContextContext = createContext<UseInvalidContextContextType>(
  initInvalidContextContextState
)

/* eslint-disable react/require-default-props */
type ChildrenType = { children?: ReactElement | ReactElement[] }

export const InvalidContextProvider = ({
  children,
}: ChildrenType): ReactElement => (
  <InvalidContextContext.Provider
    value={useInvalidContextContext(initInvalidContextState)}
  >
    {children}
  </InvalidContextContext.Provider>
)

export default InvalidContextContext
