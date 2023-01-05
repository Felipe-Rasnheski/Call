import { Box, styled, Text } from '@ignite-ui/react'
import * as Avatar from '@radix-ui/react-avatar'

export const Container = styled(Box, {
  margin: '$10',
  padding: '$4',
  display: 'flex',
  gap: '$4',

  '@media (max-width: 1000px)': {
    flexDirection: 'column',
    fontSize: '$sm',
  },
})

export const ProfileInfo = styled('div', {
  position: 'relative',
  background: '$gray900',
  borderRadius: '$md',
  padding: '$4',
  width: 'fit-content',
  height: 'fit-content',
  border: '1px solid $gray400',
  textAlign: 'center',

  '@media (max-width: 1000px)': {
    width: '100%',
    height: '100%',
    display: 'flex',
    gap: '1rem',
  },
})

export const UserAvatar = styled(Avatar.Root, {
  width: '200px',
  height: '200px',
  display: 'inline-block',
  borderRadius: '$sm',
  overflow: 'hidden',

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  svg: {
    width: '100%',
    height: '100%',
  },
})

export const Description = styled('div', {
  padding: '$4 0',
  fontFamily: 'san-serif',
  fontSize: '$lg',

  p: {
    textAlign: 'start',

    '&:first-child': {
      fontSize: '$2xl',
      color: '$gray100',
    },
    '&:nth-child(2)': {
      color: '$gray200',
    },
    '&:last-child': {
      maxWidth: '250px',
    },

    '& + &': {
      marginTop: '$2',
    },
  },

  '&:hover': {
    cursor: 'default',
  },
})

export const Schedule = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  header: {
    width: '100%',
    display: 'flex',
    position: 'relative',

    h1: {
      flex: 1,
    },
  },
})

export const AppointmentsBox = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  background: '$gray600',
  borderRadius: '$sm',

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '$2',
    alignItems: 'center',
  },
})

export const AppointmentsContainer = styled('div', {
  flex: 1,
})

export const Notice = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  padding: '$10',

  svg: {
    color: '$gray100',
  },

  h2: {
    color: '$gray200',
  },

  '&:hover': {
    cursor: 'default',
  },
})

export const Appointments = styled('div', {
  flex: 1,
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',

  '@media (max-width: 800px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  '@media (max-width: 600px)': {
    gridTemplateColumns: '1fr',
  },
})

export const ButtonEdit = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  fontSize: '$md',

  button: {
    minHeight: 35,
    all: 'unset',
    top: 0,
    right: 0,
    padding: '$2',
    fontFamily: 'Roboto, sans-serif',
    background: '$ignite500',
    borderTopRightRadius: '$sm',
    color: '$white',

    '&:first-child': {
      background: '#F75a68',
      borderRadius: 0,
      lineHeight: 0,
    },

    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '$ignite300',
    },
  },
})

export const Date = styled('div', {
  padding: '$2',
  border: '1px solid $gray700',
  position: 'relative',

  [`${Text}`]: {
    '&:first-child': {
      color: '$white',
      fontWeight: 'bold',
    },
  },

  button: {
    all: 'unset',
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '0.35rem',
    background: '$gray700',
    lineHeight: 0,
    color: '$gray200',
    transition: 'all 0.1s linear',

    '&:hover': {
      cursor: 'pointer',
      color: '#F75a68',
    },
  },
})

export const ConfirmDelete = styled('div', {
  position: 'absolute',
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$2',
  background: '$gray700',

  button: {
    all: 'unset',
    padding: '$2',
    borderRadius: '$md',
    fontWeight: 'bold',
    background: '#F75a68',
    color: '$white',
    transition: 'all 0.2s linear',

    '&:first-child': {
      background: '$ignite500',
    },

    '&:hover': {
      color: '$white',
      opacity: 0.9,
    },
  },
})
