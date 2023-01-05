import { styled, Text, TextInput } from '@ignite-ui/react'
import * as Dialog from '@radix-ui/react-dialog'

export const Form = styled('form', {
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',

    [`> ${TextInput}`]: {
      fontFamily: '$default',
    },
  },
})

export const Container = styled('div', {
  position: 'relative',
  inset: 0,
  padding: '$4',
  backgroundColor: '$black',
  borderRadius: '$sm',
  height: '90vh',
  minHeight: 'fit-content',
  overflowY: 'auto',
  overflowX: 'hidden',

  '&::-webkit-scrollbar': {
    width: '0.65rem',
  },

  '&::-webkit-scrollbar-track': {
    backgroundColor: '$gray700',
    borderRadius: '2px',
  },

  '&::-webkit-scrollbar-thumb': {
    background: '$gray500',
    borderRadius: '2px',
  },

  '&::-webkit-scrollbar-thumb:hover': {
    boxShadow: 'inset 0 0 2px $colors$gray800',
  },
})

export const Content = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  height: 'fit-content',
  padding: '$4',
  background: '$gray700',
  width: '40vw',
  minWidth: 300,
  borderRadius: '8px',
  gap: '$4',

  textarea: {
    width: '100%',
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

  '@media (max-width: 1000px)': {
    top: 5,
    bottom: 'unset',
  },
})

export const DialogOverlay = styled(Dialog.Overlay, {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.75)',
  zIndex: 2,
})

export const DialogContent = styled(Dialog.Content, {
  position: 'absolute',
  inset: 0,
  zIndex: 3,
  display: 'flex',
  justifyContent: 'center',
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
  top: '0.65rem',
  background: 'transparent',
  color: '#f8f9faff',
  borderRadius: '50%',
  lineHeight: 0,
  padding: '0.25rem',
  backgroundColor: '#121318ff',
  border: '2px solid $gray700',

  '&:hover': {
    border: '2px solid $gray400',
    cursor: 'pointer',
    backgroundColor: '#121318ff',
  },
})

export const Senha = styled('div', {
  display: 'flex',
  alignItems: 'center',
  background: '$gray900',
  borderRadius: '6px',
  padding: '0.5rem 1.1rem',

  input: {
    all: 'unset',
    flex: 1,
    fontFamily: '$default',
  },

  svg: {
    padding: '0.25rem',
    '&:hover': {
      cursor: 'pointer',
    },
  },

  button: {
    all: 'unset',
  },

  '&:hover': {
    cursor: 'text',
  },
})
