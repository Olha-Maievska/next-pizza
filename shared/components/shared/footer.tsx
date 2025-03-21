import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import React from 'react'

interface Props {
  className?: string
}

export const Footer: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center bg-primary/80 py-5 h-30',
        className
      )}
    >
      <Link href="/" className="text-white font-medium">
        Next Pizza © 2025
      </Link>
    </div>
  )
}
