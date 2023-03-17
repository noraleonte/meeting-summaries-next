import { useState } from 'react'

import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'

import useMeetingActions from '~/lib/hooks/useMeetingActions'

import DeleteActionConfirmationModal from './DeleteActionConfirmationModal'
import CreateActionModal from './CreateActionModal'

const ActionButton = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const { selectedMeetings } = useMeetingActions()

  return (
    <>
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
          <MenuItem
            fontSize="sm"
            isDisabled={!selectedMeetings.size}
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete selected
          </MenuItem>
          <MenuItem fontSize="sm" onClick={() => setIsCreateModalOpen(true)}>
            Create Meeting
          </MenuItem>
        </MenuList>
      </Menu>
      <DeleteActionConfirmationModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
      />
      <CreateActionModal
        isOpen={isCreateModalOpen}
        setIsOpen={setIsCreateModalOpen}
      />
    </>
  )
}

export default ActionButton
