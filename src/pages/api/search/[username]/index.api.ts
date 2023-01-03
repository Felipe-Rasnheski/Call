import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../lib/prisma'

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      message: 'Method not allowed',
    })
  }

  const username = String(req.query.username)
  const query = `${username}%`

  const users = await prisma.$queryRaw`
    SELECT username
    FROM users
    WHERE username like ${query}
    LIMIT 10
  `

  return res.status(200).json(users)
}
