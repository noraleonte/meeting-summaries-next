import {
  collectionGroup,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore'

import { SortingOptionType } from '~/context/SortingOptionProvider'

import db from '../../../firebase'
import Meeting, { Account } from '../types/meetings'

const colRef = collectionGroup(db, 'meetings')

const getAllMeetings = async (
  perPage: number,
  pageNumber: number,
  sortingOption: SortingOptionType,
  last?: DocumentSnapshot<DocumentData> | null
): Promise<Meeting[] | Error> => {
  try {
    const collections =
      pageNumber !== 1
        ? await getDocs(
            query(
              colRef,
              orderBy(sortingOption.sortBy, sortingOption.order),
              startAfter(last),
              limit(perPage)
            )
          )
        : await getDocs(
            query(
              colRef,
              orderBy(sortingOption.sortBy, sortingOption.order),
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
