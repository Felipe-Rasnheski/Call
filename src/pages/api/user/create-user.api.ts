import { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'
import { buildNextAuthOptions } from '../auth/[...nextauth].api'

const updateProfileBodySchema = z.object({
  name: z.string(),
  username: z.string(),
  senha: z.string(),
  bio: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const session = await unstable_getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return res.status(401).end()
  }

  const { username, senha, bio, name } = updateProfileBodySchema.parse(req.body)

  await prisma.user.create({
    data: {
      name,
      username,
      senha,
      bio,
    },
  })

  return res.status(204).end()
}
