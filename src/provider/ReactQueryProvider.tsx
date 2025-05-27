import {View, Text} from 'react-native';
import React, {PropsWithChildren, useState} from 'react';
import {QueryCache, QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {STATUS_API} from '@constants/statusApi';
import { AxiosError } from 'axios';

interface ErrorResponse {
  code?: string;
  message?: string;
  statusCode?: string;
}

const ReactQueryProvider = ({children}: PropsWithChildren) => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: (failureCount: number, error: any) => {
            const status = error?.response?.status;
            if (status === STATUS_API.SERVICE_UNAVAILABLE) {
              return false;
            }
            return failureCount < 1; // retry 1 time maximum
          },
          refetchOnMount: true,
          // refetchOnWindowFocus: true, // only work on web
          retryDelay: 500,
          // gcTime = cacheTime => default 5 minutes
          // staleTime => default 5 minutes, avoid gcTime < staleTime
          // refetchOnReconnect => refetch when network reconnects
          // refetchOnMount => refetch when the component remounts(e.g when navigating back)
        },
      },
      queryCache: new QueryCache({
        onError: (error: AxiosError<ErrorResponse> | any) => {
          const {response} = error;
          if (response) {
            const {code} = response?.data;
            console.log('query 인스턴스 에러 코드', code);
            // signOutWithCodeError({code});
          }

          if (error?.statusCode) {
            console.log('리프레시도 무효', error?.statusCode);
            // signOutWithCodeError({code: error?.code});
          }
        },
      }),
    }),
  );
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
