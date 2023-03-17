import {
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
  WhereFilterOp,
} from 'firebase/firestore'

import { FilterCollectionType } from '~/context/ActiveFilterProvider'
import { SortingOptionType } from '~/context/SortingOptionProvider'

import db from '../../../firebase'
import Meeting, { Account } from '../types/meetings'

const colRef = collection(db, 'meetings')

const getAllMeetings = async (
  perPage: number,
  pageNumber: number,
  sortingOption: SortingOptionType,
  activeFilters: FilterCollectionType,
  last?: DocumentSnapshot<DocumentData> | null
): Promise<Meeting[] | Error> => {
  const queryFilters =
    activeFilters.length > 0
      ? activeFilters.map((filter) =>
          where(
            filter.key,
            filter.operator as WhereFilterOp,
            filter.key === 'account'
              ? (filter.value as Account[]).map(
                  (accountObj) => accountObj.ref?.ref
                )
              : filter.value
          )
        )
      : []

  const queryOrder =
    activeFilters.length > 0
      ? activeFilters
          .filter((filter) => {
            const equalityOps = ['==', 'in']

            return (
              !equalityOps.includes(filter.operator) &&
              filter.key !== sortingOption.sortBy
            )
          })
          .map((filter) => filter.key)
          .filter((filter, i, a) => a.indexOf(filter) === i) // only get unique vals
          .map((filter) => orderBy(filter))
      : []

  try {
    const collections =
      pageNumber !== 1
        ? await getDocs(
            query(
              colRef,
              ...queryOrder,
              orderBy(sortingOption.sortBy, sortingOption.order),
              startAfter(last),
              ...queryFilters,
              limit(perPage)
            )
          )
        : await getDocs(
            query(
              colRef,
              ...queryOrder,
              orderBy(sortingOption.sortBy, sortingOption.order),
              ...queryFilters,

              limit(perPage)
            )
          )

    try {
      const updatedCol: Meeting[] = await Promise.all(
        collections.docs.map(async (i) => {
          const actualData = await i.data()
          const account = await getDoc(doc(db, actualData.account.path)).then(
            (acc) => acc.data() as Account
          )

          const { name, steps, time } = actualData

          return {
            name,
            id: i.id,
            steps,
            time: time.toDate(),
            account,
            ref: i,
          }
        })
      )
      return updatedCol
    } catch (e) {
      /* eslint-disable no-console */
      console.error(
        'Something went wrong while transforming meetings collection',
        e
      )
      return e as Error
    }
  } catch (e) {
    console.error('Something went wrong while fetching meeting collection', e)
    return e as Error
  }
}

export default getAllMeetings
