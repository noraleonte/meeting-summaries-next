import { Timestamp } from 'firebase/firestore'

export type Account = { hubspot_id: number | string; name: string }

type Meeting = {
  id: string
  name: string
  time: Timestamp | string | Date
  account: Account
  steps: string[]
  ref: DocumentSnapshot<DocumentData> | null
}

export default Meeting
