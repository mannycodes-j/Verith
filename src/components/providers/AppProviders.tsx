"use client";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import {
  clearSessionBoundQueryCache,
  sessionExitPath,
  subscribeToSessionIdentityChanges,
} from "@/services/sessionLifecycle";

export default function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: (failureCount, error) => {
              if (
                typeof error === "object" &&
                error !== null &&
                "status" in error &&
                typeof error.status === "number" &&
                error.status < 500
              ) {
                return false;
              }
              return failureCount < 2;
            },
            staleTime: 15_000,
          },
        },
      }),
  );

  useEffect(
    () =>
      subscribeToSessionIdentityChanges((change) => {
        clearSessionBoundQueryCache(queryClient);
        const exitPath = sessionExitPath(change.reason);
        if (exitPath) window.location.replace(exitPath);
      }),
    [queryClient],
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
