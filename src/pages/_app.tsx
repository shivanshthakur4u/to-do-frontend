import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Lato } from "next/font/google";


export const lato = Lato({
  subsets: ['latin'],
  variable: "--font-main",
  weight: ['400', '700', '300', '900']
});

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={` ${lato.className} font-sans`}>
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <Toaster />
    </QueryClientProvider>
  </main>
  )
}
