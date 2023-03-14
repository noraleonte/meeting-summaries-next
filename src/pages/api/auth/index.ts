import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.code) {
    res.status(200).json({ code: req.query.code })
  }
}
