import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function isOverdue(dateStr: string | null | undefined): boolean {
  if (!dateStr) return false
  return new Date(dateStr) < new Date()
}

export function getErrorMessage(error: any): string {
  return (
    error?.response?.data?.message ||
    error?.message ||
    'Something went wrong'
  )
}
