import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Checkbox, Text, TextInput } from '@ignite-ui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowRight, CheckCircle } from 'phosphor-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../lib/axios'
import { convertTimeStringToMinutes } from '../../utils/covert-time-in-string-in-minutes'
import { getWeekDays } from '../../utils/get-Week-days'
import {
  Buttons,
  FormError,
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
        week_day: z.number().min(0).max(6),
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
          week_day: interval.week_day,
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

type TimeIntervalsProps = { navigate: string; varianty: 'first' | 'second' }

export function Intervals({ navigate, varianty }: TimeIntervalsProps) {
  const session = useSession()

  const user_id = session.data?.user.id

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
        { week_day: 0, enabled: false, startTime: '09:00', endTime: '18:00' },
        { week_day: 1, enabled: true, startTime: '09:00', endTime: '18:00' },
        { week_day: 2, enabled: true, startTime: '09:00', endTime: '18:00' },
        { week_day: 3, enabled: true, startTime: '09:00', endTime: '18:00' },
        { week_day: 4, enabled: true, startTime: '09:00', endTime: '18:00' },
        { week_day: 5, enabled: true, startTime: '09:00', endTime: '18:00' },
        { week_day: 6, enabled: false, startTime: '09:00', endTime: '18:00' },
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

  async function handleSubmitTimeIntervals(data: any) {
    const formData = data as TimeIntervalsFormOutput

    const timeIntervals = formData.intervals.map((interval) => {
      return {
        week_day: interval.week_day,
        user_id,
        time_start_in_minutes: interval.startTimeInMinutes,
        time_end_in_minutes: interval.endTimeInMinutes,
      }
    })

    await api.post(`/schedule/${user_id}/time-intervals`, timeIntervals)

    await router.push(navigate)
  }

  return (
    <IntervalBox as="form" onSubmit={handleSubmit(handleSubmitTimeIntervals)}>
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
                <Text>{weekDays[field.week_day]}</Text>
              </IntervalDay>
              <IntervalInputs>
                <TextInput
                  size="sm"
                  type="time"
                  step={3600}
                  disabled={intervals[index].enabled === false}
                  {...register(`intervals.${index}.startTime`)}
                />
                <TextInput
                  size="sm"
                  type="time"
                  step={3600}
                  disabled={intervals[index].enabled === false}
                  {...register(`intervals.${index}.endTime`)}
                />
              </IntervalInputs>
            </IntervalItem>
          )
        })}
      </IntervalsContainer>
      {errors.intervals && <FormError>{errors.intervals.message}</FormError>}

      {varianty === 'first' && (
        <Button disabled={isSubmitting}>
          Próximo passo <ArrowRight />
        </Button>
      )}

      {varianty === 'second' && (
        <Buttons>
          <Button disabled={isSubmitting}>
            Comfirme <CheckCircle size={18} />
          </Button>
          <Button
            as="div"
            variant="secondary"
            onClick={() => router.push(navigate)}
          >
            Voltar
          </Button>
        </Buttons>
      )}
    </IntervalBox>
  )
}
