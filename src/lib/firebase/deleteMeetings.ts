import { doc, writeBatch } from 'firebase/firestore'

import db from '../../../firebase'

const deleteMeetings = async (ids: string[] | Set<string>) => {
  const batch = writeBatch(db)

  ids.forEach((id) => batch.delete(doc(db, 'meetings', id)))

  await batch.commit()
}

export default deleteMeetings
