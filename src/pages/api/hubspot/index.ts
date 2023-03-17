import { NextApiRequest, NextApiResponse } from 'next'

import adminDB from '../../../../firebaseAdmin'

type ResponseType = {
  eventId: string
  subscriptionId: string
  portalId: string
  appId: string
  occurredAt: string
  subscriptionType: string
  attemptNumber: string
  objectId: string
  changeFlag: string
  changeSource: string
  sourceId: string
  propertyName: string
  propertyValue: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    /* eslint-disable no-console */
    if (req.body) {
      const event: ResponseType =
        req.body.find(
          (e: ResponseType) => e.subscriptionType === 'company.propertyChange'
        ) ||
        req.body.find(
          (e: ResponseType) => e.subscriptionType === 'company.deletion'
        )
      const { subscriptionType } = event

      if (subscriptionType === 'company.propertyChange') {
        const account: { [key: string]: string } = {
          hubspot_id: event.objectId,
        }

        account[event.propertyName] = event.propertyValue

        await adminDB.collection('accounts').doc(event.objectId).set(account)

        console.log('set/create doc', event)
      } else {
        const batch = adminDB.batch()

        const accountRef = adminDB.collection('accounts').doc(event.objectId)

        batch.delete(accountRef)
        batch.commit()
        console.log('delete item', event)
      }
    }
    res.status(200).json({ message: 'Success' })
  } else {
    res.status(400).json({ message: 'Failed' })
  }
}
