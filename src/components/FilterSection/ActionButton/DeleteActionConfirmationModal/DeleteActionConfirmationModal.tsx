import { Dispatch, SetStateAction } from 'react'

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'

import useMeetingActions from '~/lib/hooks/useMeetingActions'
import useInvalidContext from '~/lib/hooks/useInvalidContext'
import deleteMeetings from '~/lib/firebase/deleteMeetings'

type PropTypes = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

const DeleteActionConfirmationModal = ({
  isOpen = false,
  setIsOpen,
}: PropTypes) => {
  const { dispatch: changeInvalidContext } = useInvalidContext()
  const { dispatch, REDUCER_ACTION_TYPES, selectedMeetings } =
    useMeetingActions()

  const handleDelete = async () => {
    await deleteMeetings(selectedMeetings as Set<string>)
    dispatch({ type: REDUCER_ACTION_TYPES.ADD_ARRAY, payload: [] })
    changeInvalidContext({ payload: true })
    setIsOpen(false)
  }

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="lg">Delete Confirmation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="sm">
            Are you sure you want to delete {selectedMeetings.size} records?
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleDelete} size="sm">
            Delete items
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteActionConfirmationModal
