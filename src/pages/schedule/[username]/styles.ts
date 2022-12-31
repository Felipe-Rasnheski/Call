import { Heading, styled, Text } from '@ignite-ui/react'

export const Container = styled('div', {
  maxWidth: 852,
  padding: '$8',
  margin: 'auto',
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
})
