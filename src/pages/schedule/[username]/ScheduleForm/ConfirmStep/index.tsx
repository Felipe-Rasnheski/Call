import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../../../../lib/axios'
import { ConfirmForm, FormActions, FormError, FormHeader } from './styles'

const confirmationFormSchema = z.object({
  name: z.string().min(3, { message: 'O nome presisa no minimo 3 caracteres' }),
  email: z.string().email({ message: 'digite um e-mail válido' }),
  observations: z
    .string()
    .max(30, { message: 'Máximo de 30 caracteres' })
    .nullable(),
})

type ConfirmationFormSchema = z.infer<typeof confirmationFormSchema>

interface ConfirmStepProps {
  schedulingDate: Date
  onCancelComfirmation: () => void
}

export function ConfirmStep({
  schedulingDate,
  onCancelComfirmation,
}: ConfirmStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmationFormSchema>({
    resolver: zodResolver(confirmationFormSchema),
  })

  const router = useRouter()

  const username = String(router.query.username)

  const session = useSession()

  const user_who_is_scheduling_id = session.data?.user.id
    ? session.data.user.id
    : null

  const user_who_is_scheduling_username = session.data?.user.username
    ? session.data.user.username
    : null

  async function handleConfirmScheduling(data: ConfirmationFormSchema) {
    const { name, email, observations } = data

    await api.post(`schedule/create/${username}`, {
      user_who_is_scheduling_id,
      user_who_is_scheduling_name: name,
      user_who_is_scheduling_username,
      user_who_is_scheduling_email: email,
      observations,
      date: schedulingDate,
    })

    onCancelComfirmation()
  }

  const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
  const describedTime = dayjs(schedulingDate).format('HH:mm[h]')

  return (
    <ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {describedDate}
        </Text>
        <Text>
          <Clock />
          {describedTime}
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Nome Completo</Text>
        <TextInput placeholder="Seu nome" {...register('name')} />
        {errors.name && <FormError>{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">E-mail</Text>
        <TextInput
          type="email"
          placeholder="johndoe@exemplo.com"
          {...register('email')}
        />
        {errors.email && <FormError>{errors.email.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Observações</Text>
        <TextArea {...register('observations')} />
        {errors.observations && (
          <FormError>{errors.observations.message}</FormError>
        )}
      </label>

      <FormActions>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancelComfirmation}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirma
        </Button>
      </FormActions>
    </ConfirmForm>
  )
}
