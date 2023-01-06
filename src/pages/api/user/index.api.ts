import { randomUUID } from 'crypto'
import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'
import { prisma } from '../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { username } = req.body

  if (!username) {
    const userId = randomUUID()

    setCookie({ res }, '@ignitecall:userId', userId, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return res.status(201).end()
  }

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (userExists) {
    return res.status(400).json({
      message: 'user already taken!',
    })
  }

  const user = await prisma.user.create({
    data: {
      username,
      name: '',
    },
  })

  setCookie({ res }, '@ignitecall:userId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })

  return res.status(201).json({})
}
