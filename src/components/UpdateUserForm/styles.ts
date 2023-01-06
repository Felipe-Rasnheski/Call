import { Box, styled, Text, TextInput } from '@ignite-ui/react'

export const Container = styled(Box, {
  margin: '$8 auto',
  padding: '$4',
  width: '70%',
  maxWidth: 500,

  '@media (max-width: 500px)': {
    fontSize: '$sm',
  },
})

export const Form = styled('form', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  height: 'fit-content',
  padding: '$4',
  background: '$gray700',
  width: '100%',
  minWidth: 300,
  borderRadius: '8px',
  gap: '$4',

  textarea: {
    width: '100%',
  },

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',

    [`> ${TextInput}`]: {
      fontFamily: '$default',
    },
  },
})

export const ButtonClose = styled('button', {
  all: 'unset',
  position: 'absolute',
  top: 0,
  right: 0,
  margin: '$2',
  padding: '$1',
  border: '1px solid $gray400',
  color: '$gray400',
  borderRadius: '$full',
  fontSize: 0,

  '&:hover': {
    cursor: 'pointer',
    borderColor: '$gray100',
    color: '$gray100',
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
