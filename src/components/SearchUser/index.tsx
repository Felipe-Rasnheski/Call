import { zodResolver } from '@hookform/resolvers/zod'
import { Text } from '@ignite-ui/react'
import Link from 'next/link'
import { MagnifyingGlass, X } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../lib/axios'
import { Container, Search, SearchResults, User } from './styles'

const searchUserSchema = z.object({
  query: z.string().min(1),
})

type SearchUserData = z.infer<typeof searchUserSchema>

type UserProps = { id: string; username: string; avatar_url: string }

export function SearchUser() {
  const [searchResult, setSearchResult] = useState<UserProps[]>([])

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<SearchUserData>({
    resolver: zodResolver(searchUserSchema),
  })

  const query = watch('query')

  useEffect(() => {
    if (query === '' && searchResult.length !== 0) {
      setSearchResult([])
    }
  }, [query, searchResult])

  async function handleSearchUser(data: SearchUserData) {
    const users = await api
      .get(`/search/${data.query}`)
      .then((response) => response.data)

    setSearchResult(users)
  }

  function handleClearSearch() {
    setSearchResult([])
    setValue('query', '')
  }

  return (
    <Container>
      <Search onSubmit={handleSubmit(handleSearchUser)}>
        <input
          type="text"
          placeholder="Encontre usuário"
          {...register('query')}
        />
        {searchResult.length > 0 ? (
          <span>
            <X size={20} onClick={handleClearSearch} />
          </span>
        ) : (
          <button type="submit" disabled={isSubmitting}>
            <MagnifyingGlass size={20} weight="bold" />
          </button>
        )}
      </Search>
      {searchResult.length > 0 && (
        <SearchResults>
          {searchResult.map((user) => {
            return (
              <Link href="/" key={user.id}>
                <User>
                  <Text>{user.username}</Text>
                </User>
              </Link>
            )
          })}
        </SearchResults>
      )}
    </Container>
  )
}
