import { Box, styled, Text } from '@ignite-ui/react'
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

export const Schedules = styled('div', {
  flex: 1,
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
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: '#121214',
  zIndex: 3,
  padding: '1rem',
  boxShadow: 'none',
  width: '50vw',
  borderRadius: '4px',
  overflowY: 'auto',
  margin: '2rem',
})

export const FormEdit = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const FormError = styled(Text, {
  color: '#F75a68',
})

export const FormActions = styled(Text, {
  display: 'flex',
  flexDirection: 'row-reverse',
  gap: '$2',
})

export const DialogClose = styled(Dialog.Close, {
  all: 'unset',
  position: 'absolute',
  right: '1rem',
  background: 'transparent',
  color: '#f8f9faff',
  borderRadius: '50%',
  lineHeight: 0,
  padding: '0.25rem',

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '#121318ff',
  },
})
