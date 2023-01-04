import { styled } from '@ignite-ui/react'

export const Container = styled('div', {
  background: '$gray800',
  position: 'absolute',
  top: 0,
  right: 0,
  borderRadius: '4px',
  overflow: 'hidden',
  width: '40%',
  minWidth: 300,
  zIndex: 1,
})

export const Search = styled('form', {
  width: '100%',
  display: 'flex',
  gap: '1rem',
  padding: '0.5rem 1rem',
  background: '$black',

  input: {
    all: 'unset',
    flex: 1,
    fontFamily: 'Roboto, sans-serif',
  },

  'button, span': {
    all: 'unset',
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

export const SearchResults = styled('ul', {
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.15rem',

  a: {
    textDecoration: 'none',
  },
})

export const User = styled('li', {
  padding: '0.25rem 0.5rem',
  background: '$gray900',
})
