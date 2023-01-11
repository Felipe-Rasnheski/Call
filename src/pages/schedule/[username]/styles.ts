import { Heading, styled, Text } from '@ignite-ui/react'

export const Container = styled('div', {
  maxWidth: 852,
  paddingTop: '$2',
  margin: 'auto',
  padding: '$8 0',

  '@media(max-width: 500px)': {
    fontSize: '75%',
    padding: '$2 0',
  },
})

export const UserHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  [`${Heading}`]: {
    lineHeight: '$base',
    marginTop: '$2',
  },

  [`${Text}`]: {
    color: '$gray200',
  },

  '@media(max-width: 600px)': {
    fontSize: '75%',
    padding: '$2',
    margin: '0 auto',
  },
})
