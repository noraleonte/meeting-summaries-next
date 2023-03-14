import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'

const ActionButton = () => (
  <Menu>
    <MenuButton
      as={Button}
      rightIcon={<ChevronDownIcon />}
      size="xs"
      colorScheme="gray"
      bg="white"
      variant="outline"
    >
      Actions
    </MenuButton>
    <MenuList>
      <MenuItem fontSize="sm">Delete selected</MenuItem>
      <MenuItem fontSize="sm">Change account</MenuItem>
      <MenuItem fontSize="sm">Rename Items</MenuItem>
    </MenuList>
  </Menu>
)

export default ActionButton
