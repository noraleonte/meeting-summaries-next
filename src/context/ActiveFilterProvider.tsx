import { createContext, ReactElement, useReducer } from 'react'

import { Timestamp, WhereFilterOp } from 'firebase/firestore'

import { Account } from '~/lib/types/meetings'

export type FilterType = {
  key: string
  value: string | Timestamp | Account[]
  operator: string | WhereFilterOp
}

export type FilterCollectionType = FilterType[]

type ActiveFilterStateType = { activeFilters: FilterCollectionType }

const initActiveFilterState: ActiveFilterStateType = { activeFilters: [] }

export type FilterReducerActionType = { payload: FilterType }

const reducer = (
  state: ActiveFilterStateType,
  action: FilterReducerActionType
): ActiveFilterStateType => {
  if (!action.payload) {
    throw new Error('action.payload is missing!')
  } else {
    const filteredValues = state.activeFilters.filter(
      (filter) =>
        filter.key !== action.payload.key ||
        filter.operator !== action.payload.operator
    )

    const isPayloadValid =
      action.payload.key === 'time'
        ? (action.payload.value as unknown as Timestamp)?.seconds
        : action.payload.value &&
          (action.payload.value as string | Account[])?.length > 0

    if (isPayloadValid) {
      return { activeFilters: [...filteredValues, action.payload] }
    }

    return {
      activeFilters: [...filteredValues],
    }
  }
}

const useActiveFilterContext = (initState: ActiveFilterStateType) => {
  const [state, dispatch] = useReducer(reducer, initState)

  const { activeFilters } = state

  return { dispatch, activeFilters }
}

export type UseActiveFilterContextType = ReturnType<
  typeof useActiveFilterContext
>

const initActiveFilterContextState: UseActiveFilterContextType = {
  dispatch: () => {},
  activeFilters: [],
}

const ActiveFilterContext = createContext<UseActiveFilterContextType>(
  initActiveFilterContextState
)

/* eslint-disable react/require-default-props */
type ChildrenType = { children?: ReactElement | ReactElement[] }

export const ActiveFilterProvider = ({
  children,
}: ChildrenType): ReactElement => (
  <ActiveFilterContext.Provider
    value={useActiveFilterContext(initActiveFilterState)}
  >
    {children}
  </ActiveFilterContext.Provider>
)

export default ActiveFilterContext
