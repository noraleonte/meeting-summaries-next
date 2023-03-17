import {
  Box,
  Button,
  Flex,
  FormLabel,
  Icon,
  Input,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { Timestamp } from 'firebase/firestore'
import { BsFillCalendar2DateFill } from 'react-icons/bs'

import useActiveFilter from '~/lib/hooks/useActiveFilters'

const DateFilter = () => {
  const { dispatch, activeFilters } = useActiveFilter()

  let startDate: string | Timestamp | Date =
    (activeFilters.find(
      (filter) => filter.key === 'time' && filter.operator === '>='
    )?.value as string | Timestamp) || ''
  let endDate: string | Timestamp | Date =
    (activeFilters.find(
      (filter) => filter.key === 'time' && filter.operator === '<='
    )?.value as string | Timestamp) || ''

  const transformDate = (date: Timestamp) => {
    if (date && date?.seconds) {
      return date.toDate().toISOString().slice(0, -1)
    }
    return ''
  }

  startDate = transformDate(startDate as Timestamp)
  endDate = transformDate(endDate as Timestamp)

  const getDisplayedDate = () => {
    if (!startDate && !endDate) {
      return 'All dates'
    }
    if (startDate && !endDate) {
      return `after ${format(new Date(startDate as Date), 'PP hh:mm b')}`
    }
    if (!startDate && endDate) {
      return `before ${format(new Date(endDate as Date), 'PP hh:mm b')}`
    }

    return `${format(new Date(startDate as Date), 'PP hh:mm b')} - ${format(
      new Date(startDate as Date),
      'PP hh:mm b'
    )}`
  }

  const handleChangeDate = (value: string, operator: string) =>
    dispatch({
      payload: {
        key: 'time',
        value: Timestamp.fromDate(new Date(value)),
        operator,
      },
    })

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button
          leftIcon={<Icon as={BsFillCalendar2DateFill} />}
          colorScheme="gray"
          size="xs"
          variant="outline"
          bg="white"
        >
          {getDisplayedDate()}
        </Button>
      </PopoverTrigger>
      <PopoverContent bg="gray.200" boxShadow="md" width="fit-content">
        <PopoverHeader fontSize="sm" fontWeight="bold" border="0">
          Choose the dates
        </PopoverHeader>

        <PopoverCloseButton />
        <PopoverBody>
          <Flex gap={2}>
            <Box>
              <FormLabel
                fontSize="xs"
                fontWeight="bold"
                color="gray.500"
                mb={0}
              >
                Start Date
              </FormLabel>
              <Input
                placeholder="Select Start Date and Time"
                bg="white"
                borderRadius={3}
                size="xs"
                name="startDate"
                type="datetime-local"
                value={startDate}
                onChange={(e) => handleChangeDate(e.target.value, '>=')}
              />
            </Box>

            <Box>
              <FormLabel
                fontSize="xs"
                fontWeight="bold"
                color="gray.500"
                mb={0}
              >
                End Date
              </FormLabel>
              <Input
                placeholder="Select End Date and Time"
                bg="white"
                borderRadius={3}
                size="xs"
                name="endDate"
                type="datetime-local"
                value={endDate}
                onChange={(e) => handleChangeDate(e.target.value, '<=')}
              />
            </Box>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default DateFilter
