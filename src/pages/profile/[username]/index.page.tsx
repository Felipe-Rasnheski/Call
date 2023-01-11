import { Text } from '@ignite-ui/react'
import * as Avatar from '@radix-ui/react-avatar'
import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import {
  ArrowsClockwise,
  CalendarPlus,
  PencilLine,
  Trash,
  // eslint-disable-next-line prettier/prettier
  User
} from 'phosphor-react'
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
  Toggle,
  // eslint-disable-next-line prettier/prettier
  UserAvatar
} from './styles'

interface UserProps {
  id: string
  name: string
  username: string
  email: string
  created_at: Date
  avatar_url: string
  bio: string | null
}

interface Schedules {
  id: string
  name: string
  date: Date
  email: string
  username: string
  observations: string
  created_at: Date
  user_who_is_scheduling_name?: string
  user_who_is_scheduling_email?: string
  user_who_is_scheduling_username?: string
}

interface SchedulesToShow {
  type: 'scheduled' | 'scheduledWith' | ''
  schedules: Schedules[]
}

export default function Profile() {
  const [user, setUser] = useState<UserProps>()
  const [schedulesToShow, setSchedulesToShow] = useState<SchedulesToShow>({
    type: '',
    schedules: [],
  })
  const [askConfirmDelete, setAskConfirmDelete] = useState('')
  const [updateUserToggle, setUpdateUserToggle] = useState(false)

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

      scheduled.current = scheduledResponse.map((schedule) => {
        return {
          id: schedule.id,
          date: schedule.date,
          name: schedule.user_who_is_scheduling_name!,
          email: schedule.user_who_is_scheduling_email!,
          username: schedule.user_who_is_scheduling_username!,
          observations: schedule.observations,
          created_at: schedule.created_at,
        }
      })

      if (scheduledResponse.length > 0) {
        setSchedulesToShow({ type: 'scheduled', schedules: scheduled.current })
      }
    }

    async function getScheduledWith() {
      const scheduledWithResponse: Schedules[] = await api
        .get(`/schedule/${userId}/scheduled-with`)
        .then((res) => res.data)

      scheduledWithResponse.sort((a: Schedules, b: Schedules) => {
        const dateA = dayjs(a.date).unix()
        const dateB = dayjs(b.date).unix()

        if (dateA < dateB) return -1
        if (dateA > dateB) return 1

        return 0
      })

      scheduledWith.current = scheduledWithResponse.map((schedule) => {
        return {
          id: schedule.id,
          date: schedule.date,
          name: schedule.name,
          email: schedule.email,
          username: schedule.username,
          observations: schedule.observations,
          created_at: schedule.created_at,
        }
      })

      if (scheduled.current.length === 0 && scheduledWithResponse.length > 0) {
        setSchedulesToShow({
          type: 'scheduledWith',
          schedules: scheduledWith.current,
        })
      }
    }

    getUser()
    getScheduled()
    getScheduledWith()
  }, [userId])

  async function handleDeleteSchedule(
    id: string,
    type: 'scheduled' | 'scheduledWith' | '',
  ) {
    await api.delete(`/schedule/${id}/delete`)

    const scheduledWithoutDeleted = schedulesToShow.schedules.filter(
      (schedule) => schedule.id !== id,
    )

    if (type === 'scheduled') {
      scheduled.current = scheduledWithoutDeleted
    }

    if (type === 'scheduledWith') {
      scheduledWith.current = scheduledWithoutDeleted
    }

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

  if (updateUserToggle) {
    return (
      user && (
        <UpdateUserForm
          user={user}
          setUser={setUser}
          toggleOpen={setUpdateUserToggle}
        />
      )
    )
  }

  return (
    <>
      <NextSeo title={`${user?.username} | Call`} noindex />
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

          {user && (
            <Toggle onClick={() => setUpdateUserToggle(true)}>
              <PencilLine />
            </Toggle>
          )}
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
                <span>
                  <button onClick={handleEditTimeIntervals}>
                    Editar horários
                  </button>
                </span>
                <strong>
                  <button onClick={handleEditTimeIntervals}>Edit</button>
                </strong>
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
                          <Text>{appointment.username}</Text>
                          <Text>
                            {dayjs(appointment.date).format(
                              'DD[ ]MMMM[ ]YYYY[, ]dddd',
                            )}
                          </Text>
                          <Text>{appointment.email}</Text>
                          <Text>Obs: {appointment.observations}</Text>
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
    </>
  )
}
