import { useState } from 'react'

import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import {
  FaSortAmountDown,
  FaSortAmountUp,
  FaSortAlphaDown,
} from 'react-icons/fa'
import { IconType } from 'react-icons'

type PropTypes = {
  option?: string
}

type OptionType = {
  name: string
  sortBy: string
  order?: string
  icon: IconType
}

type OptionCollection = { [key: string]: OptionType }

const sortingOptions: OptionCollection = {
  RECENT: {
    name: 'Recent',
    sortBy: 'date',
    order: 'desc',
    icon: FaSortAmountDown,
  },
  OLDEST: { name: 'Oldest', sortBy: 'date', icon: FaSortAmountUp },
  ACCOUNT: { name: 'Account (A-Z)', sortBy: 'account', icon: FaSortAlphaDown },
  NAME: { name: 'Name (A-Z)', sortBy: 'name', icon: FaSortAlphaDown },
}
const SortButton = ({ option = 'RECENT' }: PropTypes) => {
  const [selectedOption, setSelectedOption] = useState(option)

  const getOptionIcon = (key: string) => {
    const { icon: OptionIcon } = sortingOptions[key]
    return <OptionIcon />
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        leftIcon={getOptionIcon(selectedOption)}
        size="xs"
        colorScheme="gray"
        bg="white"
        variant="outline"
      >
        Sort: {sortingOptions[selectedOption].name}
      </MenuButton>
      <MenuList>
        {Object.keys(sortingOptions).map((key) => (
          <MenuItem
            {...{ key }}
            fontSize="sm"
            onClick={() => setSelectedOption(key)}
          >
            <Box mr={2}>{getOptionIcon(key)}</Box>
            {sortingOptions[key].name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

SortButton.defaultProps = {
  option: 'RECENT',
}

export default SortButton
