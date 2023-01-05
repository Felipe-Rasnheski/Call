import { useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { Intervals } from '../../../../components/Intervals'
import { Container } from './styles'

export default function EditTimeIntervals() {
  const session = useSession()
  const username = session.data?.user.username

  const navigate = `/profile/${username}`

  return (
    <>
      <NextSeo title="Selecione sua disponibilidade | Call" noindex />
      <Container>
        <Intervals navigate={navigate} varianty="second" />
      </Container>
    </>
  )
}
