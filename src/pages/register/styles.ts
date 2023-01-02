import { Heading, styled, Text } from '@ignite-ui/react'

export const Container = styled('main', {
  maxWidth: 572,
  margin: '$6 auto $4',
  padding: '0 $4',
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
})

export const FormError = styled(Text, {
  color: '#F75a68',
})
