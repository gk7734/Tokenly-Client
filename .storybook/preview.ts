import type { Preview } from '@storybook/nextjs'
import '../src/styles/globals.scss'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
        {
          name: 'tokenly-dark',
          value: '#0A0A0A',
        },
      ],
      grid: {
        cellSize: 20,
        opacity: 0.5,
        cellAmount: 5,
      },
    },
    layout: 'fullscreen',
  },
};

export default preview;