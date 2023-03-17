import { ChangeEvent } from 'react'

import { Button, Input, Stack } from '@chakra-ui/react'

type PropTypes = {
  isStepsAddDisabled: boolean
  onClickAdd: () => void
  steps: string[]
  onChangeValue: (e: ChangeEvent<HTMLInputElement>, index: number) => void
}

const AddStepsSection = ({
  isStepsAddDisabled,
  onClickAdd,
  onChangeValue,
  steps,
}: PropTypes) => (
  <Stack gap={2}>
    {steps.map((_step, index) => (
      <Input
        type="text"
        /* eslint-disable react/no-array-index-key */
        key={index}
        placeholder="new step"
        value={steps[index]}
        isInvalid={!steps[index]}
        errorBorderColor="crimson"
        onChange={(e) => onChangeValue(e, index)}
      />
    ))}
    <Button
      colorScheme="gray"
      size="xs"
      isDisabled={isStepsAddDisabled}
      onClick={onClickAdd}
    >
      Add new step
    </Button>
  </Stack>
)

export default AddStepsSection
