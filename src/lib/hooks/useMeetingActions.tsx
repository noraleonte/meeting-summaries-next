import { useContext } from 'react'

import MeetingActionsContext, {
  UseMeetingActionsContextType,
} from '../../context/MeetingActionsProvider'

const useMeetingActions = (): UseMeetingActionsContextType =>
  useContext(MeetingActionsContext)

export default useMeetingActions
