import {
  DocumentData,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  Timestamp,
} from 'firebase/firestore'

export type Account = {
  hubspot_id: number | string
  name: string
  ref?: QueryDocumentSnapshot<DocumentData>
}

type Meeting = {
  id: string
  name: string
  time: Timestamp | string | Date
  account: Account
  steps: string[]
  ref: DocumentSnapshot<DocumentData> | null
}

export default Meeting
