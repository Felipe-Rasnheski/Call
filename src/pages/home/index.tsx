import { Button, Heading, Text } from '@ignite-ui/react'
import { useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Call from '../../../public/call.svg'
import AppPreviewIMG from '../../assets/app-preview.png'
import { api } from '../../lib/axios'
import { ClaimUserNameForm } from './components'
import {
  Actions,
  Container,
  Header,
  HeaderContent,
  Hero,
  Main,
  // eslint-disable-next-line prettier/prettier
  Preview
} from './styles'

export default function Home() {
  const session = useSession()
  const router = useRouter()

  async function handleRegistration() {
    await api.post('/user', {
      username: '',
    })
    await router.push('/register/connect-calendar')
  }

  function handleLogin() {
    if (session.status === 'authenticated') {
      router.push(`profile/${session.data.user.username}`)
    } else {
      handleRegistration()
    }
  }

  return (
    <>
      <NextSeo
        title="Descomplique sua agenda | Call"
        description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre."
      />
      <Container>
        <Header>
          <HeaderContent>
            <Image src={Call} alt="call" />
            <Actions>
              <Button size="sm" onClick={handleRegistration}>
                Cadastrar-se
              </Button>
              <Button variant="secondary" size="sm" onClick={handleLogin}>
                Entrar
              </Button>
            </Actions>
          </HeaderContent>
        </Header>
        <Main>
          <Hero>
            <Heading size="4xl">Agendamento descomplicado</Heading>
            <Text size="xl">
              Conecte seu calendário e permita que as pessoas marquem
              agendamentos no seu tempo livre
            </Text>
            <ClaimUserNameForm />
          </Hero>

          <Preview>
            <Image
              src={AppPreviewIMG}
              height={400}
              quality={100}
              priority
              alt="Calendário simbolizando aplicação em funcionamento"
            />
          </Preview>
        </Main>
      </Container>
    </>
  )
}
