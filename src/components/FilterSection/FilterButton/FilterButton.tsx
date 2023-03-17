import { useState } from 'react'

import {
  Button,
  Icon,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'
import { BiFilter } from 'react-icons/bi'

import AccountFilter from './AccountFilter'

const FilterButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover
      placement="bottom-start"
      {...{ isOpen }}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
    >
      <PopoverTrigger>
        <Button
          leftIcon={<Icon as={BiFilter} />}
          colorScheme="gray"
          bg="white"
          variant="outline"
          size="xs"
        >
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent
        bg="gray.200"
        boxShadow="md"
        minWidth="sm"
        width="fit-content"
      >
        <PopoverHeader fontSize="sm" fontWeight="bold" border="0">
          Choose filters
        </PopoverHeader>

        <PopoverCloseButton />
        {isOpen && (
          <PopoverBody>
            <AccountFilter />
          </PopoverBody>
        )}
      </PopoverContent>
    </Popover>
  )
}
export default FilterButton
