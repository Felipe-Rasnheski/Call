import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { prisma } from '../../../../../lib/prisma'

const timeIntervalsBodySchema = z.array(
  z.object({
    user_id: z.string(),
    week_day: z.number(),
    time_start_in_minutes: z.number(),
    time_end_in_minutes: z.number(),
  }),
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const user_id = String(req.query.id)

  await prisma.$queryRaw`
    DELETE FROM user_time_intervals WHERE user_id = ${user_id}
  `
  const intervals = timeIntervalsBodySchema.parse(req.body)

  await prisma.userTimeInterval.createMany({
    data: intervals,
    skipDuplicates: true,
  })

  return res.status(200).end()
}
