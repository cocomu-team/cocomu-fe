import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../src/styles/theme';
import { worker } from '../src/mocks/browser';

if (import.meta.env.MODE === 'development') {
  worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
    onUnhandledRequest: 'bypass',
  });
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
