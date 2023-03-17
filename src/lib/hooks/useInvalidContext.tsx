import { useContext } from 'react'

import InvalidContextContext, {
  UseInvalidContextContextType,
} from '../../context/InvalidContextProvider'

const useInvalidContext = (): UseInvalidContextContextType =>
  useContext(InvalidContextContext)

export default useInvalidContext
