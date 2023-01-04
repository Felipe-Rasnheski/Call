import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import * as Dialog from '@radix-ui/react-dialog'
import { CheckCircle, EyeClosed, PencilLine, X } from 'phosphor-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../lib/axios'
import {
  Container,
  Content,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
  Form,
  FormActions,
  FormError,
  // eslint-disable-next-line prettier/prettier
  Senha
} from './styles'

const updateProfileSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    })
    .transform((username) => username.toLocaleLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
  email: z.string().email(),
  senha: z
    .string()
    .min(8, { message: 'A senha precisa ter pelo menos 8 caracteres.' }),
  bio: z.string().nullable(),
})

type UpdateProfileData = z.infer<typeof updateProfileSchema>

interface User {
  id: string
  name: string
  username: string
  email: string
  senha: string
  created_at: Date
  avatar_url: string
  bio: string | null
}

interface UpdateProfileForm {
  user: User
  setUser: (user: User) => void
}

export function UpdateUserForm({ user, setUser }: UpdateProfileForm) {
  const [passwordHidden, setPasswordHidden] = useState(true)

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
      senha: user?.senha,
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
        senha: data.senha,
        bio: data.bio,
      })

      setUser({
        ...user,
        name: data.name,
        username: data.username,
        email: data.email,
        senha: data.senha,
        bio: data.bio,
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Dialog.Root>
      <DialogTrigger>
        <PencilLine />
      </DialogTrigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <Form onSubmit={handleSubmit(handleUpdateProfile)}>
            <Container>
              <Content>
                <DialogClose>
                  <X size={28} />
                </DialogClose>
                <Dialog.Title className="title">Editar Perfil</Dialog.Title>
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
                  <Text size="sm">Senha</Text>
                  <Senha>
                    <input
                      type={passwordHidden ? 'password' : 'text'}
                      autoComplete=""
                      {...register('senha')}
                    />
                    <span onClick={() => setPasswordHidden(!passwordHidden)}>
                      <EyeClosed size={28} />
                    </span>
                  </Senha>
                  {errors.senha && (
                    <FormError size="sm">{errors.senha.message}</FormError>
                  )}
                </label>

                <label>
                  <Text size="sm">Sobre Você</Text>
                  <TextArea {...register('bio')} placeholder="Opcional..." />
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

                  <Dialog.Close asChild>
                    <Button type="submit">Fechar</Button>
                  </Dialog.Close>
                </FormActions>
              </Content>
            </Container>
          </Form>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
