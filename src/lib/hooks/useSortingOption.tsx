import { useContext } from 'react'

import SortingOptionContext, {
  UseSortingOptionContextType,
} from '../../context/SortingOptionProvider'

const usSortingOption = (): UseSortingOptionContextType =>
  useContext(SortingOptionContext)

export default usSortingOption
