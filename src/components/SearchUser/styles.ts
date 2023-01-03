import { styled } from '@ignite-ui/react'

export const Container = styled('div', {
  flex: 1,
})

export const Search = styled('form', {
  width: '100%',
  display: 'flex',
  gap: '1rem',
  padding: '0.5rem 1rem',
  background: '$gray900',
  borderRadius: '4px',

  input: {
    all: 'unset',
    flex: 1,
    fontFamily: 'Roboto, sans-serif',
  },

  button: {
    all: 'unset',
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

export const User = styled('div', {})
