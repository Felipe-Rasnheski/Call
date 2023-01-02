import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { ArrowRight, Check } from 'phosphor-react'
import { Container, Header } from '../styles'
import { AuthError, ConnectBox, ConnectItem } from './styles'

export default function ConnectCalendar() {
  const session = useSession()
  const isSignedIn = session.status === 'authenticated'

  const router = useRouter()
  const hasAuthError = !!router.query.error

  async function handleSignIn() {
    await signIn('google')
  }

  async function handleNavigateNextStep() {
    await router.push('/register/update-user')
  }

  return (
    <>
      <NextSeo title="Conecte sua agenda do Google | Call" noindex />
      <Container>
        <Header>
          <Heading as="strong">Conecte sua agenda!</Heading>
          <Text>
            Conecte o seu calendário para verificar automaticamente as horas
            ocupadas e os novos eventos à medida em que são agendados.
          </Text>
          <MultiStep size={4} currentStep={1} />
        </Header>

        <ConnectBox>
          <ConnectItem>
            <Text>Google Calendar</Text>
            {isSignedIn ? (
              <Button size="sm" disabled>
                Conectado
                <Check />
              </Button>
            ) : (
              <Button variant="secondary" size="sm" onClick={handleSignIn}>
                Conectar
                <ArrowRight />
              </Button>
            )}
          </ConnectItem>

          {hasAuthError && (
            <AuthError size="sm">
              Falha ao conectar ao Google, Verifique se você habilitou as
              permissões de acesso ao Google Calendar.
            </AuthError>
          )}

          <Button
            type="submit"
            onClick={handleNavigateNextStep}
            disabled={!isSignedIn}
          >
            Próximo passo
            <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  )
}
