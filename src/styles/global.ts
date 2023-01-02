import { globalCss } from '@ignite-ui/react'

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,
  },

  body: {
    backgroundColor: '$gray900',
    color: '$gray100',
    '-webkit-font-smoothing': 'antialiased',

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
  },
})
