import { useContext } from 'react'

import SortingOptionContext, {
  UseSortingOptionContextType,
} from '../../context/SortingOptionProvider'

const useSortingOption = (): UseSortingOptionContextType =>
  useContext(SortingOptionContext)

export default useSortingOption
