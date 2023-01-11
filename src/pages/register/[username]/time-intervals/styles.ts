import { Heading, styled, Text } from '@ignite-ui/react'

export const Container = styled('main', {
  maxWidth: 572,
  margin: '$6 auto $4',
  padding: '0 $4',

  '@media(max-width: 500px)': {
    fontSize: '75%',
    padding: '0 $2',
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
