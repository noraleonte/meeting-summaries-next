import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'

import useSortingOption from '../../../lib/hooks/useSortingOption'

const SortButton = () => {
  // const [selectedOption, setSelectedOption] = useState(option)
  const { dispatch, selectedOption, sortingOptions } = useSortingOption()

  const getOptionIcon = (key: string) => {
    const { icon: OptionIcon } = sortingOptions[key]
    return <OptionIcon />
  }

  const handleOptionSelection = (key: string) => {
    dispatch({ payload: key })
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
            onClick={() => handleOptionSelection(key)}
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
