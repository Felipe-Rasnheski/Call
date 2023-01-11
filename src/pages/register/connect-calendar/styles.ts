import { Box, Heading, styled, Text } from '@ignite-ui/react'

export const Container = styled('main', {
  maxWidth: 572,
  margin: '$6 auto $4',
  padding: '0 $4',

  '@media(max-width: 600px)': {
    fontSize: '75%',
    padding: '0 $1',
  },
})

export const Header = styled('div', {
  padding: '0 $6',

  [`> ${Heading}`]: {
    lineHeight: '$base',
  },

  [`> ${Text}`]: {
    color: '$gray200',
    marginBottom: '$6',
  },

  '@media(max-width: 500px)': {
    fontSize: '75%',
    padding: '0 $2',
  },
})

export const ConnectBox = styled(Box, {
  margin: '$6',
  display: 'flex',
  flexDirection: 'column',

  '@media(max-width: 500px)': {
    fontSize: '75%',
    margin: '$6 $2',
  },
})

export const ConnectItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  border: '1px solid $gray600',
  padding: '$4 $6',
  borderRadius: '$md',

  marginBottom: '$4',
})

export const AuthError = styled(Text, {
  color: '#F75A68',
  marginBottom: '$4',
})
