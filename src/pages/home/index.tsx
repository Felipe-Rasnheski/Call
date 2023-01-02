import { Button, Heading, Text } from '@ignite-ui/react'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Call from '../../../public/call.svg'
import AppPreviewIMG from '../../assets/app-preview.png'
import { ClaimUserNameForm } from './components'
import { Actions, Container, Header, Hero, Main, Preview } from './styles'

export default function Home() {
  const router = useRouter()

  async function handleRegistration() {
    await router.push('/register/connect-calendar')
  }

  return (
    <>
      <NextSeo
        title="Descomplique sua agenda | Call"
        description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre."
      />
      <Container>
        <Header>
          <Image src={Call} alt="call" />
          <Actions>
            <Button size="sm" onClick={handleRegistration}>
              Cadastrar-se
            </Button>
            <Button variant="secondary" size="sm">
              Entrar
            </Button>
          </Actions>
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
