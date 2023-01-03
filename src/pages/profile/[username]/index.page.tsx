import * as Avatar from '@radix-ui/react-avatar'
import * as Dialog from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { PencilLine, User as UserIcon } from 'phosphor-react'
import { SearchUser } from '../../../components/SearchUser'
import { UpdateUserForm } from '../../../components/UpdateUserForm'
import { api } from '../../../lib/axios'
import {
  Container,
  Description,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
  ProfileInfo,
  Schedules,
  // eslint-disable-next-line prettier/prettier
  UserAvatar
} from './styles'

interface User {
  id: string
  name: string
  username: string
  email: string
  senha: string
  created_at: Date
  avatar_url: string
  bio: string
}

export default function Profile() {
  const session = useSession()
  const userId = session.data?.user.id

  const { data: user } = useQuery<User>(
    ['user', userId],
    async () => {
      if (!userId) return null

      const user = await api
        .get(`/user/${userId}`)
        .then((response) => response.data)

      return user
    },
    {
      enabled: !!userId,
    },
  )

  return (
    <Container>
      <ProfileInfo>
        <UserAvatar>
          <Avatar.Image src={user?.avatar_url} alt={user?.name} />
          <Avatar.Fallback>
            <UserIcon />
          </Avatar.Fallback>
        </UserAvatar>

        <Description>
          <p>{user?.name}</p>
          <p title="Username">{user?.username}</p>
          <p title="Biografia">{user?.bio}</p>
        </Description>

        <Dialog.Root>
          <DialogTrigger>
            <PencilLine />
          </DialogTrigger>
          <Dialog.Portal>
            <DialogOverlay />
            <DialogContent>
              {user && <UpdateUserForm user={user} />}
            </DialogContent>
          </Dialog.Portal>
        </Dialog.Root>
      </ProfileInfo>
      <Schedules>
        <header>
          <h1>Horários</h1>
          <SearchUser />
        </header>
      </Schedules>
    </Container>
  )
}
