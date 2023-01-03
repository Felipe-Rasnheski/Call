import { Box, styled, Text, TextInput } from '@ignite-ui/react'
import * as Dialog from '@radix-ui/react-dialog'

export const Content = styled('div', {
  position: 'relative',
  padding: '$4',
  height: '100%',
  overflowY: 'auto',
  background: '$black',
  boxShadow: 'none',
  borderRadius: '8px',

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

export const FormEdit = styled(Box, {
  marginTop: '$6',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',

    [`> ${TextInput}`]: {
      fontFamily: '$default',
    },
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
