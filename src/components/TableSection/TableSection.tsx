import { useState } from 'react'

import {
  Box,
  Checkbox,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'

import meetings from '../../lib/constants/meetings'

import StepList from './StepList'

const tableHeadings: string[] = ['Name', 'Time', 'Account', 'Steps']

const TableSection = () => {
  const [selectedRows, setSelectedRows] = useState(new Set())

  const allSelected = selectedRows.size === meetings.length
  const isIndeterminate =
    selectedRows.size > 0 && selectedRows.size !== meetings.length

  const selectIndividualRow = (id: string | number) =>
    setSelectedRows((prev) => {
      if (prev.has(id)) {
        prev.delete(id)
      } else {
        prev.add(id)
      }
      return new Set(prev)
    })

  const selectAllRows = () =>
    setSelectedRows((previous) => {
      if (previous.size === meetings.length) {
        return new Set()
      }

      const ids: (string | number)[] = meetings.reduce(
        (prev: string[], curr) => [...prev, curr.id],
        []
      )
      return new Set(ids)
    })

  return (
    <Box boxShadow="md" borderRadius={4} bg="white">
      <TableContainer>
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
            {meetings.map((meeting) => (
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
                  {meeting.time}
                </Td>
                <Td borderRightWidth={1} fontWeight={500}>
                  {meeting.account}
                </Td>
                <Td fontWeight={500}>
                  <StepList steps={meeting.steps} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default TableSection
