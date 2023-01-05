import dayjs from 'dayjs'
import { google } from 'googleapis'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { getGoogleOAuthToken } from '../../../../../lib/google'
import { prisma } from '../../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const username = String(req.query.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return res.status(400).json({ message: 'User does not exist!' })
  }

  const { name, email } = user

  const createSchedulingBody = z.object({
    user_who_is_scheduling_name: z.string().nullable(),
    user_who_is_scheduling_username: z.string().nullable(),
    user_who_is_scheduling_email: z.string().nullable(),
    user_who_is_scheduling_id: z.string().nullable(),
    observations: z.string(),
    date: z.string().datetime(),
  })

  const {
    user_who_is_scheduling_id,
    user_who_is_scheduling_name,
    user_who_is_scheduling_username,
    user_who_is_scheduling_email,
    observations,
    date,
  } = createSchedulingBody.parse(req.body)

  const schedulingDate = dayjs(date).startOf('hour')

  if (schedulingDate.isBefore(new Date())) {
    return res.status(400).json({ message: 'Date is in the past!' })
  }

  const conflictingScheduling = await prisma.scheduling.findFirst({
    where: {
      user_id: user.id,
      date: schedulingDate.toDate(),
    },
  })

  if (conflictingScheduling) {
    return res
      .status(400)
      .json({ message: 'There is another scheduling at the same time!' })
  }

  const scheduling = await prisma.scheduling.create({
    data: {
      user_id: user.id,
      name,
      email: String(user.email),
      username,
      observations,
      user_who_is_scheduling_id,
      user_who_is_scheduling_name,
      user_who_is_scheduling_username,
      user_who_is_scheduling_email,
      date: schedulingDate.toDate(),
    },
  })

  try {
    const calendar = google.calendar({
      version: 'v3',
      auth: await getGoogleOAuthToken(user.id),
    })

    await calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: 1,
      requestBody: {
        summary: `Call: ${name}`,
        description: observations,
        start: {
          dateTime: schedulingDate.format(),
        },
        end: {
          dateTime: schedulingDate.add(1, 'hour').format(),
        },
        attendees: [{ email, displayName: name }],
        conferenceData: {
          createRequest: {
            requestId: scheduling.id,
            conferenceSolutionKey: {
              type: 'hangoutsMeet',
            },
          },
        },
      },
    })
  } catch (err) {
    console.error({
      message: `User ${username}  has no account on Google Calendar!`,
    })
  }

  return res.status(201).end()
}
