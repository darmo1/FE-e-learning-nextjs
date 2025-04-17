"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
interface QueryProviderProps {
    children: React.ReactNode
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries:{
            staleTime: 30 * 60 * 1000,
            retry: false
        }
    }
})

export default function QueryProvider({ children }: QueryProviderProps) {

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
