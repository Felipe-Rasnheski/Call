import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  // eslint-disable-next-line prettier/prettier
  TextInput
} from '@ignite-ui/react'
import { useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../../lib/axios'
import { convertTimeStringToMinutes } from '../../../utils/covert-time-in-string-in-minutes'
import { getWeekDays } from '../../../utils/get-Week-days'
import { Container, FormError, Header } from '../styles'
import {
  IntervalBox,
  IntervalDay,
  IntervalInputs,
  IntervalItem,
  // eslint-disable-next-line prettier/prettier
  IntervalsContainer
} from './styles'

const timeIntervalsFormSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length > 0, {
      message: 'Você precisa selecionar pelo menos um dia da semana!',
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        }
      })
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes,
        )
      },
      {
        message:
          'O horário de término deve ser pelo menos 1h distante do inicio.',
      },
    ),
})

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<TimeIntervalsFormInput>({
    resolver: zodResolver(timeIntervalsFormSchema),
    defaultValues: {
      intervals: [
        { weekDay: 0, enabled: false, startTime: '09:00', endTime: '18:00' },
        { weekDay: 1, enabled: true, startTime: '09:00', endTime: '18:00' },
        { weekDay: 2, enabled: true, startTime: '09:00', endTime: '18:00' },
        { weekDay: 3, enabled: true, startTime: '09:00', endTime: '18:00' },
        { weekDay: 4, enabled: true, startTime: '09:00', endTime: '18:00' },
        { weekDay: 5, enabled: true, startTime: '09:00', endTime: '18:00' },
        { weekDay: 6, enabled: false, startTime: '09:00', endTime: '18:00' },
      ],
    },
  })

  const weekDays = getWeekDays()

  const intervals = watch('intervals')

  const { fields } = useFieldArray({
    control,
    name: 'intervals',
  })

  const router = useRouter()

  const session = useSession()

  console.log(session.data?.user.id)

  async function handleSetTimeIntervals(data: any) {
    const formData = data as TimeIntervalsFormOutput

    await api.post('/users/time-intervals', formData)

    await router.push(`/profile/${session.data?.user.id}`)
  }

  return (
    <>
      <NextSeo title="Selecione sua disponibilidade | Call" noindex />
      <Container>
        <Header>
          <Heading as="strong">Quase lá</Heading>
          <Text>
            Defina o intervalo de horários que você está disponivel em cada dia
            da semana
          </Text>
          <MultiStep size={4} currentStep={3} />
        </Header>

        <IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
          <IntervalsContainer>
            {fields.map((field, index) => {
              return (
                <IntervalItem key={field.id}>
                  <IntervalDay>
                    <Controller
                      name={`intervals.${index}.enabled`}
                      control={control}
                      render={({ field }) => {
                        return (
                          <Checkbox
                            onCheckedChange={(checked) => {
                              field.onChange(checked === true)
                            }}
                            checked={field.value}
                          />
                        )
                      }}
                    />
                    <Text>{weekDays[field.weekDay]}</Text>
                  </IntervalDay>
                  <IntervalInputs>
                    <TextInput
                      size="sm"
                      type="time"
                      step={60}
                      disabled={intervals[index].enabled === false}
                      {...register(`intervals.${index}.startTime`)}
                    />
                    <TextInput
                      size="sm"
                      type="time"
                      step={60}
                      disabled={intervals[index].enabled === false}
                      {...register(`intervals.${index}.endTime`)}
                    />
                  </IntervalInputs>
                </IntervalItem>
              )
            })}
          </IntervalsContainer>
          {errors.intervals && (
            <FormError>{errors.intervals.message}</FormError>
          )}
          <Button disabled={isSubmitting}>
            Próximo passo <ArrowRight />
          </Button>
        </IntervalBox>
      </Container>
    </>
  )
}
