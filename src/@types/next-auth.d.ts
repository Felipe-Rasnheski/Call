import 'next-auth'

declare module 'next-auth' {
  export interface User {
    id: string
    name: string
    email: string
    username: string
    avatar_url
  }

  interface Session {
    user: User
  }
}
