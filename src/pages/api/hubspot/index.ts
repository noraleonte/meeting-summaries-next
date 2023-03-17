import { NextApiRequest, NextApiResponse } from 'next'

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
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    /* eslint-disable no-console */
    if (req.body) {
      const event =
        req.body.find(
          (e: ResponseType) => e.subscriptionType === 'company.propertyChange'
        ) ||
        req.body.find(
          (e: ResponseType) => e.subscriptionType === 'company.deletion'
        )
      const { subscriptionType } = event

      if (subscriptionType === 'company.propertyChange') {
        console.log('set/create doc', event)
      } else {
        console.log('delete item', event)
      }
    }
    res.status(200).json({ message: 'Success' })
  } else {
    res.status(400).json({ message: 'Failed' })
  }
}
