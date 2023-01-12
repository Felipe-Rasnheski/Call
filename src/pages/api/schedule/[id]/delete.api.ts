import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'src/lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'DELETE') {
    return res.status(405).end()
  }

  const scheduleId = String(req.query.id)

  await prisma.scheduling.delete({
    where: {
      id: scheduleId,
    },
  })

  return res.status(200).end()
}
