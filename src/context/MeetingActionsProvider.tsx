import { createContext, ReactElement, useReducer } from 'react'

type SelectedMeetingsType = Set<string | number>

type MeetingActionsStateType = { selectedMeetings: SelectedMeetingsType }

const initMeetingActionsState: MeetingActionsStateType = {
  selectedMeetings: new Set(),
}

export const REDUCER_ACTION_TYPES = {
  ADD_ONE: 'ADD_ONE',
  ADD_ARRAY: 'ADD_ARRAY',
}

export type MeetingActionsReducerType = {
  type: string
  payload?: string | number | (string | number)[]
}

const reducer = (
  state: MeetingActionsStateType,
  action: MeetingActionsReducerType
): MeetingActionsStateType => {
  if (!action.payload) {
    throw new Error('action.payload is missing!')
  } else {
    if (action.type === REDUCER_ACTION_TYPES.ADD_ONE) {
      const newState = new Set(state.selectedMeetings)
      if (state.selectedMeetings.has(action.payload as string | number)) {
        newState.delete(action.payload as string | number)
      } else {
        newState.add(action.payload as string | number)
      }
      return { selectedMeetings: new Set(newState) }
    }

    return { selectedMeetings: new Set(action.payload as (string | number)[]) }
  }
}

const useMeetingActionsContext = (initState: MeetingActionsStateType) => {
  const [state, dispatch] = useReducer(reducer, initState)

  const { selectedMeetings } = state

  return { dispatch, selectedMeetings, REDUCER_ACTION_TYPES }
}

export type UseMeetingActionsContextType = ReturnType<
  typeof useMeetingActionsContext
>

const initMeetingActionsContextState: UseMeetingActionsContextType = {
  dispatch: () => {},
  selectedMeetings: new Set(),
  REDUCER_ACTION_TYPES,
}

const MeetingActionsContext = createContext<UseMeetingActionsContextType>(
  initMeetingActionsContextState
)

/* eslint-disable react/require-default-props */
type ChildrenType = { children?: ReactElement | ReactElement[] }

export const MeetingActionsProvider = ({
  children,
}: ChildrenType): ReactElement => (
  <MeetingActionsContext.Provider
    value={useMeetingActionsContext(initMeetingActionsState)}
  >
    {children}
  </MeetingActionsContext.Provider>
)

export default MeetingActionsContext
