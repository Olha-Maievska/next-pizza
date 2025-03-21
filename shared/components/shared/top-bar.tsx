import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Container, Categories } from '@/shared/components/shared'
import { Category } from '@prisma/client'

interface Props {
  className?: string
  categories: Category[]
}

export const TopBar: React.FC<Props> = ({ className, categories }) => {
  return (
    <div
      className={cn(
        'sticky top-0 z-10 bg-white py-5 shadow-lg shadow-black/5',
        className
      )}
    >
      <Container className="flex items-center justify-between">
        <Categories items={categories} />
      </Container>
    </div>
  )
}
