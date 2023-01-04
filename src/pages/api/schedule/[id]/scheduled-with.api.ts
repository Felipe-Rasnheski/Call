import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const user_id = String(req.query.id)

  const schedule = await prisma.scheduling.findMany({
    where: {
      id: user_id,
    },
  })

  return res.status(200).json(schedule)
}
