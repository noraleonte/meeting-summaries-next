import { useEffect, useState } from 'react'

import {
  Box,
  Checkbox,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { format } from 'date-fns'

import getAllMeetings from '~/lib/firebase/getAllMeetings'
import Meeting from '~/lib/types/meetings'
import useSortingOption from '~/lib/hooks/useSortingOption'
import useActiveFilter from '~/lib/hooks/useActiveFilters'
import useMeetingActions from '~/lib/hooks/useMeetingActions'
import useInvalidContext from '~/lib/hooks/useInvalidContext'

import Paginator from '../Paginator'

import StepList from './StepList'

const tableHeadings: string[] = ['Name', 'Time', 'Account', 'Steps']

const TableSection = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [pageNumber, setPageNumber] = useState<number>(1)

  const { selectedSortingOption } = useSortingOption()
  const { dispatch: changeInvalidContext, invalidContext } = useInvalidContext()
  const {
    dispatch,
    selectedMeetings: selectedRows,
    REDUCER_ACTION_TYPES,
  } = useMeetingActions()
  const { activeFilters } = useActiveFilter()

  const perPage = 5

  useEffect(() => {
    ;(async () => {
      const last =
        meetings.length > 0 ? meetings[meetings.length - 1].ref : null
      const meetingCollection = await getAllMeetings(
        perPage,
        pageNumber,
        selectedSortingOption,
        activeFilters,
        last
      )

      if (meetingCollection && typeof meetingCollection !== typeof Error) {
        setMeetings(meetingCollection as Meeting[])
      }
    })()

    if (invalidContext) changeInvalidContext({ payload: false })
  }, [pageNumber, selectedSortingOption, activeFilters, invalidContext])

  const allSelected = selectedRows.size === meetings.length
  const isIndeterminate =
    selectedRows.size > 0 && selectedRows.size !== meetings.length

  const selectIndividualRow = (id: string | number) => {
    dispatch({ type: 'ADD_ONE', payload: id })
  }

  const selectAllRows = () => {
    let ids: string | number | (string | number)[]
    if (selectedRows.size === meetings.length) {
      ids = []
    } else {
      ids = meetings.reduce((prev: string[], curr) => [...prev, curr.id], [])
    }

    dispatch({ type: REDUCER_ACTION_TYPES.ADD_ARRAY, payload: ids })
  }

  return (
    <Box boxShadow="md" borderRadius={4} bg="white">
      <Paginator
        {...{ setPageNumber, pageNumber, perPage }}
        prevDisabled={pageNumber === 1}
        nextDisabled={!meetings.length || meetings.length < perPage}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                <Checkbox
                  size="sm"
                  isChecked={allSelected}
                  {...{ isIndeterminate }}
                  onChange={selectAllRows}
                />
              </Th>
              {tableHeadings.map((heading) => (
                <Th key={heading}>
                  <Text size="sm" casing="initial" color="gray.500">
                    {heading}
                  </Text>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody fontSize="xs">
            {meetings?.length > 0 &&
              meetings.map((meeting) => (
                <Tr
                  key={meeting.id}
                  bg={selectedRows.has(meeting.id) ? 'cyan.50' : 'white'}
                >
                  <Td>
                    <Checkbox
                      size="sm"
                      isChecked={selectedRows.has(meeting.id)}
                      onChange={() => selectIndividualRow(meeting.id)}
                    />
                  </Td>
                  <Td borderRightWidth={1}>
                    <Text fontWeight={600} color="cyan.400">
                      {meeting.name}
                    </Text>
                  </Td>
                  <Td borderRightWidth={1} fontWeight={500}>
                    {format(meeting.time as Date, 'PP hh:mm b')}
                  </Td>
                  <Td borderRightWidth={1} fontWeight={500}>
                    {meeting.account.name}
                  </Td>
                  <Td fontWeight={500}>
                    <StepList steps={meeting.steps} />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Paginator>
    </Box>
  )
}

export default TableSection
