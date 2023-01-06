import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CheckCircle, X } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../lib/axios'
import {
  ButtonClose,
  Container,
  Form,
  FormActions,
  // eslint-disable-next-line prettier/prettier
  FormError
} from './styles'

const updateProfileSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    }),
  // .transform((username) => username.toLocaleLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
  email: z.string().email(),
  bio: z.string().nullable(),
})

type UpdateProfileData = z.infer<typeof updateProfileSchema>

interface User {
  id: string
  name: string
  username: string
  email: string
  created_at: Date
  avatar_url: string
  bio: string | null
}

interface UpdateProfileForm {
  user: User
  setUser: (user: User) => void
  toggleOpen: (open: boolean) => void
}

export function UpdateUserForm({
  user,
  setUser,
  toggleOpen,
}: UpdateProfileForm) {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name,
      username: user?.username,
      email: user?.email,
      bio: user?.bio,
    },
  })

  async function handleUpdateProfile(data: UpdateProfileData) {
    try {
      await api.put('/user/update-user', {
        id: user.id,
        name: data.name,
        username: data.username,
        email: data.email,
        bio: data.bio,
      })

      setUser({
        ...user,
        name: data.name,
        username: data.username,
        email: data.email,
        bio: data.bio,
      })

      toggleOpen(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(handleUpdateProfile)}>
        <ButtonClose onClick={() => toggleOpen(false)}>
          <X size={24} />
        </ButtonClose>

        <h1>Editar Perfil</h1>
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
          <Text size="sm">Email</Text>
          <TextInput type="email" {...register('email')} />
          {errors.email && (
            <FormError size="sm">{errors.email.message}</FormError>
          )}
        </label>

        <label>
          <Text size="sm">Sobre Você</Text>
          <TextArea {...register('bio')} placeholder="Opcional..." />
        </label>

        <FormActions>
          <Button type="submit" variant="secondary" disabled={isSubmitting}>
            Confirmar
            <CheckCircle />
          </Button>
          <Button type="submit" onClick={() => toggleOpen(false)}>
            Cancelar
          </Button>
        </FormActions>
      </Form>
    </Container>
  )
}
