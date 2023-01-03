import { Box, styled } from '@ignite-ui/react'
import * as Avatar from '@radix-ui/react-avatar'
import * as Dialog from '@radix-ui/react-dialog'

export const Container = styled(Box, {
  margin: '$10',
  padding: '$4',
  display: 'flex',
  gap: '$12',
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
  fontFamily: '$default',
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

export const DialogTrigger = styled(Dialog.Trigger, {
  all: 'unset',
  position: 'absolute',
  right: 0,
  bottom: 0,
  padding: '$2 $4',

  '&:hover': {
    cursor: 'pointer',
  },
})

export const DialogOverlay = styled(Dialog.Overlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.75)',
  zIndex: 2,
})

export const DialogContent = styled(Dialog.Content, {
  position: 'fixed',
  background: 'transparent',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 3,
  padding: '2rem 0',
  width: '50vw',
  minWidth: 400,
  height: '100%',
})

export const Schedules = styled('div', {
  flex: 1,

  header: {
    width: '100%',
    display: 'flex',
    h1: {
      flex: 1,
    },
  },
})
