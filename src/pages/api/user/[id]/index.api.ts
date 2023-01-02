import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }

  const userId = String(req.query.id)

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    return res.status(400).json({ message: 'User not found' })
  }

  return res.status(200).json({ ...user })
}
