import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { prisma } from '../../../lib/prisma'

const updateProfileBodySchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  senha: z.string(),
  email: z.string().email(),
  bio: z.string(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    return res.status(405).end()
  }

  const { id, name, username, senha, email, bio } =
    updateProfileBodySchema.parse(req.body)

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      username,
      senha,
      email,
      bio,
    },
  })

  return res.status(204).end()
}
