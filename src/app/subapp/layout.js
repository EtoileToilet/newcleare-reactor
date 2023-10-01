import { Inter } from 'next/font/google'
import { NextGuard } from '@app/components/app-guard'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }) {
  return (
    <NextGuard> { children }</NextGuard>
  )
}
