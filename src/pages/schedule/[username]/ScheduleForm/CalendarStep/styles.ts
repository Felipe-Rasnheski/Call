import { Box, styled } from '@ignite-ui/react'

export const CalendarContainer = styled('div', {
  margin: '0 auto',
  maxWidth: '100%',

  '> button': {
    margin: '0 auto',
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },

  '@media(max-width: 600px)': {
    fontSize: '75%',
  },
})

export const Container = styled(Box, {
  position: 'relative',
  padding: 0,
  display: 'grid',
  border: 'none',

  variants: {
    isTimePickerOpen: {
      true: {
        gridTemplateColumns: '1fr 280px',

        '@media (max-width: 900px)': {
          gridTemplateColumns: '1fr',
        },

        '@media(max-width: 600px)': {
          fontSize: '75%',
          margin: '$2',
        },
      },
      false: {
        width: 540,
        margin: '$4 auto',
        gridTemplateColumns: '1fr',

        '@media(max-width: 600px)': {
          fontSize: '75%',
          margin: '$2',
        },
      },
    },
  },

  '@media (max-width: 900px)': {
    margin: '$6 $10',
  },
})

export const PickerContainer = styled('div', {
  position: 'relative',
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

  '@media(max-width: 500px)': {
    fontSize: '75%',
    padding: '$2 $2 0',
  },

  '@media (max-width: 900px)': {
    position: 'relative',
    borderTop: '10px solid $black',
    width: '100%',
    border: '1px solid $gray600',
    borderRadius: '8px',
  },

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
