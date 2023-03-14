import { useState } from 'react'

import { ListItem, Text, UnorderedList } from '@chakra-ui/react'

import ShowMoreToggle from './ShowMoreToggle'

type PropTypes = { steps: string[] }

const StepList = ({ steps }: PropTypes) => {
  const [isExpanded, toggleIsExpanded] = useState(false)
  const dataToDisplay = isExpanded ? steps : steps.slice(0, 3)

  return (
    <>
      <UnorderedList>
        {dataToDisplay.map((step, index) => (
          /* eslint-disable  react/no-array-index-key */
          <ListItem key={index}>
            <Text noOfLines={3}>{step}</Text>
          </ListItem>
        ))}
      </UnorderedList>
      {steps.length > 3 && (
        <ShowMoreToggle
          {...{ isExpanded }}
          onClick={() => {
            toggleIsExpanded((prev) => !prev)
          }}
        />
      )}
    </>
  )
}

export default StepList
