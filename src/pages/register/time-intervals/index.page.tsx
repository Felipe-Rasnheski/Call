import { Heading, MultiStep, Text } from '@ignite-ui/react'
import { useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { Intervals } from '../../../components/Intervals'
import { Container, Header } from './styles'

export default function TimeIntervals() {
  const session = useSession()
  const username = session.data?.user.username

  const navigate = `/profile/${username}/calendar`

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

        <Intervals navigate={navigate} />
      </Container>
    </>
  )
}
