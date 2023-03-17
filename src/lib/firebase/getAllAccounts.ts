import { collection, getDocs } from 'firebase/firestore'

import db from '../../../firebase'
import { Account } from '../types/meetings'

const colRef = collection(db, 'accounts')

const getAllAccounts = async (): Promise<Account[] | Error> => {
  try {
    const accounts = await getDocs(colRef)
    try {
      const updatedAccounts = accounts.docs.map((account) => {
        /* eslint-disable  @typescript-eslint/naming-convention */
        const { hubspot_id, name } = account.data()
        return { hubspot_id, name, ref: account }
      })

      return updatedAccounts
    } catch (e) {
      /* eslint-disable no-console */
      console.error(
        'Something went wrong while transforming accounts collection',
        e
      )
      return e as Error
    }
  } catch (e) {
    console.error('Something went wrong while fetching accounts collection', e)
    return e as Error
  }
}

export default getAllAccounts
