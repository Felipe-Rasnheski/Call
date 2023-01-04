import { Text } from '@ignite-ui/react'
import * as Avatar from '@radix-ui/react-avatar'

import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'
import { ArrowsClockwise, CalendarPlus, Trash, User } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { SearchUser } from '../../../components/SearchUser'
import { UpdateUserForm } from '../../../components/UpdateUserForm'
import { api } from '../../../lib/axios'
import {
  Appointments,
  AppointmentsBox,
  ButtonEdit,
  ConfirmDelete,
  Container,
  Date,
  Description,
  Notice,
  ProfileInfo,
  Schedule,
  ScheduledTimes,
  // eslint-disable-next-line prettier/prettier
  UserAvatar
} from './styles'

interface UserProps {
  id: string
  name: string
  username: string
  email: string
  senha: string
  created_at: Date
  avatar_url: string
  bio: string | null
}

interface Scheduled {
  id: string
  name: string
  date: Date
  email: string
  observations: string
  created_at: Date
}

export default function Profile() {
  const [user, setUser] = useState<UserProps>()
  const [scheduled, setScheduled] = useState<Scheduled[]>([])
  const [scheduledWith, setScheduledWith] = useState<Scheduled[]>([])
  const [askConfirmDelete, setAskConfirmDelete] = useState('')

  const session = useSession()
  const userId = session.data?.user.id

  useEffect(() => {
    if (!userId) return

    async function getUser() {
      const user = await api.get(`/user/${userId}`).then((res) => res.data)

      setUser(user)
    }

    async function getScheduled() {
      const scheduled = await api
        .get(`schedule/${userId}`)
        .then((res) => res.data)

      scheduled.sort((a: Scheduled, b: Scheduled) => {
        const dateA = dayjs(a.date).unix()
        const dateB = dayjs(b.date).unix()

        if (dateA < dateB) return -1
        if (dateA > dateB) return 1

        return 0
      })

      setScheduled(scheduled)
    }

    async function getScheduledWith() {
      const scheduledWith = await api
        .get(`/schedule/${userId}/scheduled-with`)
        .then((res) => res.data)

      scheduledWith.sort((a: Scheduled, b: Scheduled) => {
        const dateA = dayjs(a.date).unix()
        const dateB = dayjs(b.date).unix()

        if (dateA < dateB) return -1
        if (dateA > dateB) return 1

        return 0
      })

      setScheduledWith(scheduledWith)
    }

    getUser()
    getScheduled()
    getScheduledWith()
  }, [userId])

  async function handleDeleteSchedule(id: string) {
    await api.delete(`/schedule/${id}/delete`)

    const scheduledWithoutDeleted = scheduled.filter(
      (schedule) => schedule.id !== id,
    )

    setScheduled(scheduledWithoutDeleted)
  }

  return (
    <Container>
      <ProfileInfo>
        <UserAvatar>
          <Avatar.Image src={user?.avatar_url} alt={user?.name} />
          <Avatar.Fallback>
            <User />
          </Avatar.Fallback>
        </UserAvatar>

        <Description>
          <p>{user?.name}</p>
          <p title="Username">{user?.username}</p>
          <p title="Biografia">{user?.bio}</p>
        </Description>

        {user && <UpdateUserForm user={user} setUser={setUser} />}
      </ProfileInfo>
      <Schedule>
        <header>
          <h1>Horários Agendados</h1>
          <SearchUser />
        </header>
        <ScheduledTimes>
          {scheduled.length === 0 ? (
            <Notice>
              <CalendarPlus size={52} />
              <h2>Você ainda não tem nenhum horário agendado</h2>
            </Notice>
          ) : (
            <AppointmentsBox>
              <header>
                <h2>Marcaram com você</h2>
                <ButtonEdit>
                  <button>
                    <ArrowsClockwise size={18} />
                  </button>
                  <button>Editar horários</button>
                </ButtonEdit>
              </header>
              <Appointments>
                {scheduled.map((appointment) => {
                  return (
                    <Date key={appointment.id}>
                      <div>
                        <Text>{appointment.name}</Text>
                        <Text>
                          {dayjs(appointment.date).format(
                            'DD[ ]MMMM[ ]YYYY[, ]dddd',
                          )}
                        </Text>
                        <Text>{appointment.email}</Text>
                        <Text>{appointment.observations}</Text>
                      </div>
                      <button
                        onClick={() => setAskConfirmDelete(appointment.id)}
                      >
                        <Trash weight="bold" />
                      </button>
                      {askConfirmDelete === appointment.id && (
                        <ConfirmDelete>
                          <button onClick={() => setAskConfirmDelete('')}>
                            Cancelar
                          </button>
                          <button
                            onClick={() => handleDeleteSchedule(appointment.id)}
                          >
                            Deletar
                          </button>
                        </ConfirmDelete>
                      )}
                    </Date>
                  )
                })}
              </Appointments>
            </AppointmentsBox>
          )}
        </ScheduledTimes>
      </Schedule>
    </Container>
  )
}
