import { Button } from '@chakra-ui/react'

type PropTypes = { isExpanded: boolean; onClick: () => void }

const ShowMoreToggle = ({ isExpanded, onClick }: PropTypes) => (
  <Button colorScheme="gray" variant="ghost" size="xs" {...{ onClick }}>
    {isExpanded ? 'Show Less' : 'Show More'}
  </Button>
)

export default ShowMoreToggle
