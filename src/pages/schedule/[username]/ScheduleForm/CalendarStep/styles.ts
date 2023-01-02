import { Box, styled } from '@ignite-ui/react'

export const Container = styled(Box, {
  margin: '$6 auto 0',
  padding: 0,
  display: 'grid',
  maxWidth: '100%',
  position: 'relative',

  variants: {
    isTimePickerOpen: {
      true: {
        gridTemplateColumns: '1fr 280px',

        '@media (max-width: 900px)': {
          gridTemplateColumns: '1fr',
        },
      },
      false: {
        width: 540,
        gridTemplateColumns: '1fr',
      },
    },
  },
})

export const TimerPicker = styled('div', {
  borderLeft: '1px solid $gray600',
  padding: '$6 $6 0',
  overflowY: 'auto',

  position: 'absolute',
  top: 0,
  bottom: 0,
  right: 0,
  width: 280,

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

export const TimerPickerHeader = styled('div', {
  fontWeight: '$medium',
  fontSize: '$lg',

  span: {
    color: '$gray200',
  },
})

export const TimerPickerList = styled('div', {
  marginTop: '$3',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$2',

  '@media (max-width: 900px)': {
    gridTemplateColumns: '2fr',
  },
})

export const TimerPickerItem = styled('button', {
  border: 0,
  backgroundColor: '$gray600',
  padding: '$2 0',
  cursor: 'pointer',
  color: '$gray100',
  borderRadius: '$sm',
  fontSize: '$sm',
  lineHeight: '$base',

  '&:last-child': {
    marginBottom: '$6',
  },

  '&:disabled': {
    background: 'none',
    cursor: 'default',
    opacity: 0.4,
  },

  '&:not(:disabled):hover': {
    background: '$gray500',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },
})
