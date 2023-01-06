import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextInput } from '@ignite-ui/react'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../../lib/axios'
import { Form, FormAnnotation } from './styles'

const claimUserNameFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hifens.',
    }),
  // .transform((userName) => userName.toLowerCase()),
})

type ClaimUserNameFormSchema = z.infer<typeof claimUserNameFormSchema>

export function ClaimUserNameForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ClaimUserNameFormSchema>({
    resolver: zodResolver(claimUserNameFormSchema),
  })

  const router = useRouter()

  async function handleClaimUserName(data: ClaimUserNameFormSchema) {
    const { username } = data

    try {
      await api.post('/user', {
        username,
      })
    } catch (err) {
      console.error(err)
    }

    await router.push('/register/connect-calendar')
  }

  return (
    <>
      <Form as="form" onSubmit={handleSubmit(handleClaimUserName)}>
        <TextInput
          size="sm"
          prefix="call.vercelApp/"
          placeholder="seu-usuario"
          {...register('username')}
        />
        <Button size="sm" type="submit" disabled={isSubmitting}>
          Cadastrar-se
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : 'Digite o nome do usuário desejado'}
        </Text>
      </FormAnnotation>
    </>
  )
}
