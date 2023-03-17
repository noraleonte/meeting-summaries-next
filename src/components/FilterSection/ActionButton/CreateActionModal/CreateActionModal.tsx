import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react'

import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Icon,
  Box,
  FormLabel,
  Stack,
  Select,
} from '@chakra-ui/react'
import { BsCursorText, BsFillCalendarCheckFill } from 'react-icons/bs'

import { Account } from '~/lib/types/meetings'
import getAllAccounts from '~/lib/firebase/getAllAccounts'
import createOrUpdateMeeting from '~/lib/firebase/createOrUpdateMeeting'
import useInvalidContext from '~/lib/hooks/useInvalidContext'

import AddStepsSection from './AddStepsSection'

type PropTypes = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export type FormDataType = {
  name: string
  time: Date | string
  steps: string[]
  account: Account | null
}

type ValueType = string | Date | string[] | Account | null

type ObjectValueType = string & (string | Date) & string[] & (Account | null)

type AttrbuteType = 'name' | 'time' | 'steps' | 'account'

const initState: FormDataType = { name: '', time: '', steps: [], account: null }

const CreateActionModal = ({ isOpen = false, setIsOpen }: PropTypes) => {
  const [formData, setFormData] = useState<FormDataType>(initState)
  const [accounts, setAccounts] = useState<Account[]>([])

  const { dispatch: changeInvalidContext } = useInvalidContext()

  const getAccountByHubspotId = (id: string | number) =>
    accounts.find((account) => account.hubspot_id === id)

  const isStepsAddDisabled =
    formData.steps.findIndex((step) => !step || !step.length) >= 0

  const handleSetAttribute = (attribute: AttrbuteType, value: ValueType) =>
    setFormData((prev) => {
      const prevCopy = prev
      prevCopy[attribute] = value as ObjectValueType
      return { ...prevCopy }
    })

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await createOrUpdateMeeting(formData)
    setFormData(initState)
    changeInvalidContext({ payload: true })
    setIsOpen(false)
  }

  useEffect(() => {
    ;(async () => {
      const accountsCollection = (await getAllAccounts()) as Account[]

      if (accountsCollection && accountsCollection.length > 0) {
        setAccounts(accountsCollection)
      }
    })()
  }, [])

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="lg">Record new meeting</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <ModalBody>
            <Stack gap={2}>
              <Box>
                <FormLabel fontSize="xs" fontWeight="bold" color="gray.500">
                  Meeting name
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={BsCursorText} color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Meeting name"
                    value={formData.name}
                    isInvalid={!formData.name}
                    errorBorderColor="crimson"
                    onChange={(e) =>
                      handleSetAttribute('name', e.target.value as string)
                    }
                  />
                </InputGroup>
              </Box>
              <Box>
                <FormLabel fontSize="xs" fontWeight="bold" color="gray.500">
                  Meeting time
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={BsFillCalendarCheckFill} color="gray.300" />
                  </InputLeftElement>
                  <Input
                    type="datetime-local"
                    placeholder="Meeting time"
                    value={(formData.time as string) || ''}
                    isInvalid={!formData.time}
                    errorBorderColor="crimson"
                    onChange={(e) => handleSetAttribute('time', e.target.value)}
                  />
                </InputGroup>
              </Box>
              <Box>
                <FormLabel fontSize="xs" fontWeight="bold" color="gray.500">
                  Associated account
                </FormLabel>
                <Select
                  placeholder="Select option"
                  onChange={(e) =>
                    handleSetAttribute(
                      'account',
                      getAccountByHubspotId(e.target.value) as Account
                    )
                  }
                >
                  {accounts.length > 0 &&
                    accounts.map((account) => (
                      <option
                        key={account.hubspot_id}
                        value={account.hubspot_id}
                      >
                        {account.name}
                      </option>
                    ))}
                </Select>
              </Box>
              <Box>
                <FormLabel fontSize="xs" fontWeight="bold" color="gray.500">
                  Next steps
                </FormLabel>
                <AddStepsSection
                  {...{ isStepsAddDisabled }}
                  steps={formData.steps}
                  onClickAdd={() =>
                    handleSetAttribute('steps', [...formData.steps, ''])
                  }
                  onChangeValue={(
                    e: ChangeEvent<HTMLInputElement>,
                    index: number
                  ) => {
                    const { steps } = formData
                    steps[index] = e.target.value
                    handleSetAttribute('steps', steps)
                  }}
                />
              </Box>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              size="sm"
              colorScheme="cyan"
              mr={3}
              isDisabled={!formData.name || !formData.time}
            >
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
export default CreateActionModal
