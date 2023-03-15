import { createContext, ReactElement, useReducer } from 'react'

import { OrderByDirection } from 'firebase/firestore'
import { IconType } from 'react-icons'
import {
  FaSortAmountDown,
  FaSortAmountUp,
  FaSortAlphaDown,
  FaSortAlphaUp,
} from 'react-icons/fa'

export type SortingOptionType = {
  name: string
  sortBy: string
  order: OrderByDirection
  icon: IconType
}

export type OptionCollectionType = { [key: string]: SortingOptionType }

export const sortingOptions: OptionCollectionType = {
  RECENT: {
    name: 'Recent',
    sortBy: 'time',
    order: 'desc',
    icon: FaSortAmountDown,
  },
  OLDEST: {
    name: 'Oldest',
    sortBy: 'time',
    order: 'asc',
    icon: FaSortAmountUp,
  },
  NAME: {
    name: 'Name (A-Z)',
    sortBy: 'name',
    order: 'asc',
    icon: FaSortAlphaDown,
  },
  NAME_DESC: {
    name: 'Name (Z-A)',
    sortBy: 'name',
    order: 'desc',
    icon: FaSortAlphaUp,
  },
}
export const optionKeys: Set<string> = new Set(Object.keys(sortingOptions))

type SortingOptionStateType = { selectedOption: string }

const initSortingOptionState: SortingOptionStateType = {
  selectedOption: Object.keys(sortingOptions)[0],
}

export type ReducerActionType = {
  payload?: string
}

const reducer = (
  _state: SortingOptionStateType,
  action: ReducerActionType
): SortingOptionStateType => {
  if (!action.payload) {
    throw new Error('action.payload is missing!')
  } else if (!optionKeys.has(action.payload)) {
    throw new Error('Invalid action.payload provided')
  } else {
    return { selectedOption: action.payload }
  }
}

const useSortingOptionContext = (initState: SortingOptionStateType) => {
  const [state, dispatch] = useReducer(reducer, initState)

  const { selectedOption } = state

  const selectedSortingOption = sortingOptions[state.selectedOption]

  return { dispatch, selectedOption, sortingOptions, selectedSortingOption }
}

export type UseSortingOptionContextType = ReturnType<
  typeof useSortingOptionContext
>

const initSortingOptionContextState: UseSortingOptionContextType = {
  dispatch: () => {},
  selectedOption: Object.keys(sortingOptions)[0],
  sortingOptions,
  selectedSortingOption: Object.values(sortingOptions)[0],
}

const SortingOptionContext = createContext<UseSortingOptionContextType>(
  initSortingOptionContextState
)

/* eslint-disable react/require-default-props */
type ChildrenType = { children?: ReactElement | ReactElement[] }

export const SortingOptionProvider = ({
  children,
}: ChildrenType): ReactElement => (
  <SortingOptionContext.Provider
    value={useSortingOptionContext(initSortingOptionState)}
  >
    {children}
  </SortingOptionContext.Provider>
)

export default SortingOptionContext
