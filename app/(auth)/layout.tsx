import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TaskFlow — Sign In',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
