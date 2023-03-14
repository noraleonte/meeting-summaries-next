import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log(req)
    res.status(200).json({ message: 'success' })
  } else {
    console.log('FAIL')
  }
}
