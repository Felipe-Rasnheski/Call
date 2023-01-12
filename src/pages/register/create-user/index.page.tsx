import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
  // eslint-disable-next-line prettier/prettier
  TextInput
} from '@ignite-ui/react'
import { AxiosError } from 'axios'
import { GetServerSideProps } from 'next'
import { unstable_getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../../lib/axios'
import { buildNextAuthOptions } from '../../api/auth/[...nextauth].api'
import {
  Container,
  FormAnnotation,
  FormError,
  Header,
  // eslint-disable-next-line prettier/prettier
  ProfileBox
} from './styles'

const createUserSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    }),
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
  email: z.string().email(),
  bio: z.string().nullable(),
})

type CreateUserFormData = z.infer<typeof createUserSchema>

interface UserFromSession {
  id: string
  name: string
  username: string
  email: string
  avatar_url: string
}

export default function CreateUser() {
  const session: any = useSession()

  const user: UserFromSession = session.data.user

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
    },
  })

  const router = useRouter()

  async function handleCreateUser(data: CreateUserFormData) {
    const username = data.username
    try {
      await api.put('/user/update-user', {
        id: user.id,
        name: data.name,
        username,
        email: data.email,
        bio: data.bio,
      })

      await router.push(`/register/${username}/time-intervals`)
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.message) {
        alert(error.response.data.message)
      }
    }
  }

  return (
    <>
      <NextSeo title="Crie uma conta | Call" noindex />
      <Container>
        <Header>
          <Heading as="strong">Bem-vindo ao Ignite call</Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois.
          </Text>
          <MultiStep size={3} currentStep={2} />
        </Header>

        <ProfileBox as="form" onSubmit={handleSubmit(handleCreateUser)}>
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
            <FormAnnotation size="sm">
              Fale um pouco sobre você. Isto será exibido em sua página pessoal.
            </FormAnnotation>
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Próximo passo
            <ArrowRight />
          </Button>
        </ProfileBox>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  return {
    props: {
      session,
    },
  }
}
