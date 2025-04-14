import type { Preview } from '@storybook/react';
import { Global, ThemeProvider } from '@emotion/react';
import { theme } from '../src/styles/theme';
import { worker } from '../src/mocks/browser';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useToastStore } from '@stores/useToastStore';
import globalStyles from '@styles/globalStyles';
import ToastList from '@components/_common/molecules/ToastList';
import BaseModal from '@components/Modal/BaseModal';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
      retry: 0,
    },
    mutations: {
      onError: (error) => {
        useToastStore.getState().error(error.message);
      },
    },
  },
});

const callMsw = (Story: any) => {
  React.useEffect(() => {
    if (import.meta.env.MODE === 'development') {
      worker.start({
        serviceWorker: {
          url: '/mockServiceWorker.js',
        },
        onUnhandledRequest: 'bypass',
      });
    }

    return () => {
      if (import.meta.env.MODE === 'development') {
        worker.stop();
      }
    };
  }, []);

  return <Story />;
};

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
    callMsw,
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Global styles={globalStyles()} />
          <ToastList />
          <BaseModal />
          <Story />
        </ThemeProvider>
      </QueryClientProvider>
    ),
  ],
};

export default preview;
