import type { Metadata } from 'next'
import './globals.css'
import NextThemeProvider from '@/provider/next-theme-provider'
import ReduxProvider from '@/redux/ReduxProvider'
import SocketProvider from '@/provider/SocketProvider'


export const metadata: Metadata = {
  title: "Taskify",
  description: "Collaborate, manage projects, and reach new productivity peaks",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <NextThemeProvider attribute='class' defaultTheme='dark' enableSystem>
            <SocketProvider>
              {children}
            </SocketProvider>
          </NextThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
