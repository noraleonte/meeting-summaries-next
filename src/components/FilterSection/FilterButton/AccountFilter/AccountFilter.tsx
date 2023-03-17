import { useEffect, useState } from 'react'

import {
  Box,
  Flex,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from '@chakra-ui/react'

import { Account } from '~/lib/types/meetings'
import useActiveFilter from '~/lib/hooks/useActiveFilters'
import getAllAccounts from '~/lib/firebase/getAllAccounts'

const AccountFilter = () => {
  const [accounts, setAccounts] = useState<Account[]>([])

  const { dispatch, activeFilters } = useActiveFilter()

  const activeAccountFilters: Account[] =
    (activeFilters.find((filter) => filter.key === 'account')
      ?.value as Account[]) || []

  const activeAccountFilterIds = activeAccountFilters.map(
    (filter) => filter.hubspot_id
  )

  useEffect(() => {
    ;(async () => {
      const accountsCollection = (await getAllAccounts()) as Account[]

      if (accountsCollection && accountsCollection.length > 0) {
        setAccounts(accountsCollection)
      }
    })()
  }, [])

  const handleChooseAccount = (account: Account) => {
    dispatch({
      payload: {
        key: 'account',
        operator: 'in',
        value: [...(activeAccountFilters as Account[]), account],
      },
    })
  }

  const handleRemoveAccount = (account: Account) => {
    dispatch({
      payload: {
        key: 'account',
        operator: 'in',
        value: (activeAccountFilters as Account[]).filter(
          (acc) => acc.hubspot_id !== account.hubspot_id
        ),
      },
    })
  }
  return (
    <>
      <Text fontSize="sm" pb={1}>
        Account
      </Text>
      {activeAccountFilters.length > 0 && (
        <Box mb={2}>
          <Text fontWeight="bold" color="gray.400" fontSize="xs" pb={1}>
            Delete account filters
          </Text>
          <Flex gap={2}>
            {activeAccountFilters.map((account) => (
              <Tag
                cursor="pointer"
                borderRadius="full"
                size="xs"
                key={account.hubspot_id}
                variant="solid"
                colorScheme="cyan"
                px={2}
                py={1}
                fontSize="xs"
              >
                <TagLabel>{account.name}</TagLabel>
                <TagCloseButton onClick={() => handleRemoveAccount(account)} />
              </Tag>
            ))}
          </Flex>
        </Box>
      )}

      <Box>
        <Text fontWeight="bold" color="gray.400" fontSize="xs" pb={1}>
          Choose accounts
        </Text>
        <Flex gap={2}>
          {accounts.length > 0 &&
            accounts
              .filter(
                (account) =>
                  !activeAccountFilterIds.includes(account.hubspot_id)
              )
              .map((account) => (
                <Tag
                  cursor="pointer"
                  borderRadius="full"
                  size="sm"
                  key={account.hubspot_id}
                  variant="solid"
                  colorScheme="gray"
                  px={2}
                  py={1}
                  fontSize="xs"
                  onClick={() => handleChooseAccount(account)}
                >
                  {account.name}
                </Tag>
              ))}
        </Flex>
      </Box>
    </>
  )
}

export default AccountFilter
