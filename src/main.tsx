import { createRoot } from 'react-dom/client';
import { initGptErrorAnalyzer } from 'gpt-error-analyzer';
import { Global, ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useToastStore } from '@stores/useToastStore';
import ToastList from '@components/_common/molecules/ToastList';
import { worker } from '@mocks/browser';
import BaseModal from '@components/Modal/BaseModal';
import AppRouter from '@router/AppRouter';

import globalStyles from './styles/globalStyles';
import { theme } from './styles/theme';

if (import.meta.env.MODE === 'development') {
  await worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
    onUnhandledRequest: 'bypass',
  });

  initGptErrorAnalyzer({
    gptServerUrl: 'http://13.124.168.88:4000',
  });
}

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

const root = createRoot(document.getElementById('root') as Element);

root.render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles()} />
      <ToastList />
      <BaseModal />
      <AppRouter />
    </ThemeProvider>
  </QueryClientProvider>,
);
