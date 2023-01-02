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
import { Container, FormError, Header } from '../styles'
import { FormAnnotation, ProfileBox } from './styles'

const createUserFormData = z
  .object({
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
    confirmeSenha: z.string(),
    bio: z.string().nullable(),
  })
  .refine((obj) => obj.senha === obj.confirmeSenha, {
    message: 'As senhas não são iguais!',
    path: ['confirmeSenha'],
  })

type CreateUserFormData = z.infer<typeof createUserFormData>

interface UserFromSession {
  id: string
  name: string
  username: string
  email: string
  avatar_url: string
}

export default function UpdateUser() {
  const session: any = useSession()

  const user: UserFromSession = session.data.user

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormData),
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
    },
  })

  const router = useRouter()

  async function handleUpdateUser(data: CreateUserFormData) {
    try {
      await api.put('/user/update-user', {
        id: user.id,
        name: data.name,
        username: data.username,
        email: data.email,
        senha: data.senha,
        bio: data.bio,
      })

      await router.push('/register/time-intervals')
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
          <MultiStep size={4} currentStep={2} />
        </Header>

        <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateUser)}>
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
            <TextInput type="password" {...register('senha')} />
            {errors.senha && (
              <FormError size="sm">{errors.senha.message}</FormError>
            )}
          </label>

          <label>
            <Text size="sm">Confirme Senha</Text>
            <TextInput type="password" {...register('confirmeSenha')} />
            {errors.confirmeSenha && (
              <FormError size="sm">{errors.confirmeSenha.message}</FormError>
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
            Finalizar
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
