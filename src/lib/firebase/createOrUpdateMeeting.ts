import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  setDoc,
  Timestamp,
} from 'firebase/firestore'

import { FormDataType } from '~/components/FilterSection/ActionButton/CreateActionModal/CreateActionModal'

import db from '../../../firebase'
import Meeting from '../types/meetings'

const createOrUpdateMeeting = async (meetingData: FormDataType | Meeting) => {
  const updatedData = {
    name: meetingData.name,
    account: meetingData.account?.ref?.ref as DocumentReference<DocumentData>,
    time: Timestamp.fromDate(new Date(meetingData.time as string)),
    steps: meetingData.steps.filter((step) => step.length > 0 && step),
  }

  const document = (meetingData as Meeting)?.id
    ? await setDoc(
        doc(db, 'meetings', (meetingData as Meeting).id),
        updatedData
      )
    : await addDoc(collection(db, 'meetings'), updatedData)

  return document
}

export default createOrUpdateMeeting
