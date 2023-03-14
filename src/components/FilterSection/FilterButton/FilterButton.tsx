import { Button, Icon } from '@chakra-ui/react'
import { BiFilter } from 'react-icons/bi'

const FilterButton = () => (
  <Button
    leftIcon={<Icon as={BiFilter} />}
    colorScheme="gray"
    bg="white"
    variant="outline"
    size="xs"
  >
    Filters
  </Button>
)

export default FilterButton
