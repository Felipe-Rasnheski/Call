import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import * as Avatar from '@radix-ui/react-avatar'
import * as Dialog from '@radix-ui/react-dialog'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { CheckCircle, PencilLine, User as UserIcon, X } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../../lib/axios'
import {
  Container,
  Description,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
  FormActions,
  FormEdit,
  FormError,
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
  created_at: Date
  avatar_url: string
  bio: string
}

const updateProfileSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    }),
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
  bio: z.string().nullable(),
})

type UpdateProfileData = z.infer<typeof updateProfileSchema>

export default function Profile() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  })

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

  async function handleUpdateProfile(data: UpdateProfileData) {
    console.log(data)
  }

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
              <DialogClose>
                <X size={28} />
              </DialogClose>
              <Dialog.Title className="title">Editar Perfil</Dialog.Title>
              <FormEdit as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
                <label>
                  <Text size="sm">Nome completo</Text>
                  <TextInput placeholder="seu nome" {...register('name')} />
                  {errors.name && (
                    <FormError size="sm">{errors.name.message}</FormError>
                  )}
                </label>

                <label>
                  <Text size="sm">Nome de usuário</Text>
                  <TextInput
                    prefix="call.vercelApp/"
                    placeholder="seu-usuario"
                    {...register('username')}
                  />
                  {errors.username && (
                    <FormError size="sm">{errors.username.message}</FormError>
                  )}
                </label>

                <label>
                  <Text size="sm">Biografia</Text>
                  <TextArea {...register('bio')} />
                </label>

                <FormActions>
                  <Button
                    type="submit"
                    variant="secondary"
                    disabled={isSubmitting}
                  >
                    Confirmar
                    <CheckCircle />
                  </Button>
                  <Button type="submit">Cancelar</Button>
                </FormActions>
              </FormEdit>
            </DialogContent>
          </Dialog.Portal>
        </Dialog.Root>
      </ProfileInfo>
      <Schedules>
        <h1>Horarios</h1>
      </Schedules>
    </Container>
  )
}
