import { zodResolver } from '@hookform/resolvers/zod'
import { Text } from '@ignite-ui/react'
import { randomBytes } from 'crypto'
import { MagnifyingGlass } from 'phosphor-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../lib/axios'
import { Container, Search, User } from './styles'

const searchUserSchema = z.object({
  query: z.string().min(1),
})

type SearchUserData = z.infer<typeof searchUserSchema>

type UserProps = { username: string }

export function SearchUser() {
  const [searchResult, setSearchResult] = useState<UserProps[]>([])

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<SearchUserData>({
    resolver: zodResolver(searchUserSchema),
  })

  async function handleSearchUser(data: SearchUserData) {
    const user = await api
      .get(`/search/${data.query}`)
      .then((response) => response.data)

    setSearchResult(user)
  }

  return (
    <Container>
      <Search onSubmit={handleSubmit(handleSearchUser)}>
        <input
          type="text"
          placeholder="Encontre usuário"
          {...register('query')}
        />
        <button type="submit" disabled={isSubmitting}>
          <MagnifyingGlass size={20} weight="bold" />
        </button>
      </Search>
      {searchResult.map((user) => {
        const key = randomBytes(20).toString('hex')
        return (
          <User key={key}>
            <Text>{user.username}</Text>
          </User>
        )
      })}
    </Container>
  )
}
