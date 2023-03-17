import { useContext } from 'react'

import ActiveFilterContext, {
  UseActiveFilterContextType,
} from '../../context/ActiveFilterProvider'

const useActiveFilter = (): UseActiveFilterContextType =>
  useContext(ActiveFilterContext)

export default useActiveFilter
