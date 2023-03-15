import { Dispatch, ReactNode, SetStateAction } from 'react'

import { Box, Button, Flex, Text } from '@chakra-ui/react'

type PaginatorPropTypes = {
  setPageNumber: Dispatch<SetStateAction<number>>
  pageNumber: number
  perPage: number
  children: ReactNode
  prevDisabled: boolean
  nextDisabled: boolean
}

const Paginator = ({
  setPageNumber,
  perPage,
  pageNumber,
  children,
  prevDisabled = false,
  nextDisabled = false,
}: PaginatorPropTypes) => (
  <Box>
    {children}
    <Flex p={4} justifyContent="space-between">
      <Box>
        <Text fontSize="xs" color="gray.400" as="b">
          Showing {(pageNumber - 1) * perPage + 1} to {pageNumber * perPage}
        </Text>
      </Box>
      <Flex gap={2}>
        <Button
          colorScheme="gray"
          size="xs"
          onClick={() =>
            setPageNumber((prev) => (!nextDisabled ? prev - 1 : 1))
          }
          isDisabled={prevDisabled}
        >
          Previous
        </Button>

        <Button
          colorScheme="gray"
          size="xs"
          onClick={() => setPageNumber((prev) => prev + 1)}
          isDisabled={nextDisabled}
        >
          Next
        </Button>
      </Flex>
    </Flex>
  </Box>
)

export default Paginator
