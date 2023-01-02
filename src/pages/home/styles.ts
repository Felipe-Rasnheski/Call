import { Button, Heading, styled, Text } from '@ignite-ui/react'

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',
})

export const Header = styled('header', {
  display: 'flex',
  padding: '$4 $10',
  background: '$black',
  borderBottom: '1px solid $gray500',
  justifyContent: 'space-between',

  img: {
    height: '$10',
    width: '$10',
  },
})

export const Actions = styled('div', {
  display: 'flex',
  gap: '$2',

  [`> ${Button}`]: {
    height: '$10',
  },

  '@media(max-width: 600px)': {
    [`> ${Button}`]: {
      height: '$10',

      '&:first-child': {
        display: 'none',
      },
    },
  },
})

export const Main = styled('main', {
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '$10',
  overflow: 'hidden',

  '@media(max-width: 600px)': {
    paddingRight: '$10',
  },
})

export const Hero = styled('div', {
  maxWidth: 480,

  [`> ${Heading}`]: {
    '@media(max-width: 600px)': {
      fontSize: '$6xl',
    },
  },

  [`> ${Text}`]: {
    marginTop: '$2',
    color: '$gray200',

    '@media(max-width: 600px)': {
      fontSize: '$md',
    },
  },
})

export const Preview = styled('div', {
  overflow: 'hidden',
  marginLeft: '$12',
  minWidth: 827,
  minHeight: 442,

  img: {
    width: '100%',
    height: '100%',
  },

  '@media(max-width: 600px)': {
    display: 'none',
  },
})
