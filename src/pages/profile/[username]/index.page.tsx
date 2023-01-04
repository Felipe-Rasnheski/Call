import { Text } from '@ignite-ui/react'
import * as Avatar from '@radix-ui/react-avatar'

import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowsClockwise, CalendarPlus, Trash, User } from 'phosphor-react'
import { useEffect, useRef, useState } from 'react'
import { SearchUser } from '../../../components/SearchUser'
import { UpdateUserForm } from '../../../components/UpdateUserForm'
import { api } from '../../../lib/axios'
import {
  Appointments,
  AppointmentsBox,
  AppointmentsContainer,
  ButtonEdit,
  ConfirmDelete,
  Container,
  Date,
  Description,
  Notice,
  ProfileInfo,
  Schedule,
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

interface Schedules {
  id: string
  name: string
  date: Date
  email: string
  observations: string
  created_at: Date
}

interface SchedulesToShow {
  type: string
  schedules: Schedules[]
}

export default function Profile() {
  const [user, setUser] = useState<UserProps>()
  const [schedulesToShow, setSchedulesToShow] = useState<SchedulesToShow>({
    type: '',
    schedules: [],
  })
  const [askConfirmDelete, setAskConfirmDelete] = useState('')

  const session = useSession()
  const userId = session.data?.user.id

  const scheduled = useRef<Schedules[]>([])
  const scheduledWith = useRef<Schedules[]>([])

  useEffect(() => {
    if (!userId) return

    async function getUser() {
      const user = await api.get(`/user/${userId}`).then((res) => res.data)

      setUser(user)
    }

    async function getScheduled() {
      const scheduledResponse: Schedules[] = await api
        .get(`schedule/${userId}`)
        .then((res) => res.data)

      scheduledResponse.sort((a: Schedules, b: Schedules) => {
        const dateA = dayjs(a.date).unix()
        const dateB = dayjs(b.date).unix()

        if (dateA < dateB) return -1
        if (dateA > dateB) return 1

        return 0
      })

      scheduled.current = scheduledResponse

      if (scheduledResponse.length > 0) {
        setSchedulesToShow({ type: 'scheduled', schedules: scheduledResponse })
      }
    }

    async function getScheduledWith() {
      const scheduledWithResponse = await api
        .get(`/schedule/${userId}/scheduled-with`)
        .then((res) => res.data)

      scheduledWithResponse.sort((a: Schedules, b: Schedules) => {
        const dateA = dayjs(a.date).unix()
        const dateB = dayjs(b.date).unix()

        if (dateA < dateB) return -1
        if (dateA > dateB) return 1

        return 0
      })

      scheduledWith.current = scheduledWithResponse

      if (scheduled.current.length === 0 && scheduledWithResponse > 0) {
        setSchedulesToShow({
          type: 'scheduledWith',
          schedules: scheduledWithResponse,
        })
      }
    }

    getUser()
    getScheduled()
    getScheduledWith()
  }, [userId])

  async function handleDeleteSchedule(id: string, type: string) {
    await api.delete(`/schedule/${id}/delete`)

    const scheduledWithoutDeleted = schedulesToShow.schedules.filter(
      (schedule) => schedule.id !== id,
    )

    setSchedulesToShow({
      type,
      schedules: scheduledWithoutDeleted,
    })
  }

  function handleChangeSchedulesToShow() {
    if (schedulesToShow.type === 'scheduled') {
      setSchedulesToShow({
        type: 'scheduledWith',
        schedules: scheduledWith.current,
      })
    } else {
      setSchedulesToShow({
        type: 'scheduled',
        schedules: scheduled.current,
      })
    }
  }

  const router = useRouter()

  function handleEditTimeIntervals() {
    router.push(`/profile/${user?.username}/edit-time-intervals`)
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
        <AppointmentsBox>
          <header>
            {schedulesToShow.type === 'scheduled' ? (
              <h2>Marcaram com você</h2>
            ) : (
              <h2>Você marcou com</h2>
            )}
            <ButtonEdit>
              <button onClick={handleChangeSchedulesToShow}>
                <ArrowsClockwise size={18} />
              </button>
              <button onClick={handleEditTimeIntervals}>Editar horários</button>
            </ButtonEdit>
          </header>
          <AppointmentsContainer>
            {schedulesToShow.schedules.length === 0 ? (
              <Notice>
                <CalendarPlus size={52} />
                <h2>Nenhum horário agendado</h2>
              </Notice>
            ) : (
              <Appointments>
                {schedulesToShow.schedules.map((appointment) => {
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
                            onClick={() =>
                              handleDeleteSchedule(
                                appointment.id,
                                schedulesToShow.type,
                              )
                            }
                          >
                            Deletar
                          </button>
                        </ConfirmDelete>
                      )}
                    </Date>
                  )
                })}
              </Appointments>
            )}
          </AppointmentsContainer>
        </AppointmentsBox>
      </Schedule>
    </Container>
  )
}
