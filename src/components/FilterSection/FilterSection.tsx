import { Flex, Spacer } from '@chakra-ui/react'

import ActionButton from './ActionButton'
import DateFilter from './DateFilter'
import FilterButton from './FilterButton'
import SortButton from './SortButton'

const FilterSection = () => (
  <Flex>
    <Flex gap={2}>
      <FilterButton />
      <ActionButton />
    </Flex>
    <Spacer />
    <Flex gap={2}>
      <SortButton />
      <DateFilter />
    </Flex>
  </Flex>
)

export default FilterSection
