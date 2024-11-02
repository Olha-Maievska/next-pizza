import { cn } from '@/lib/utils'
import React from 'react'
import { Container, Catedories, SortPopap } from '@/components/shared'

interface Props {
  className?: string
}

export const TopBar: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        'sticky top-0 z-10 bg-white py-5 shadow-lg shadow-black/5',
        className
      )}
    >
      <Container className="flex items-center justify-between">
        <Catedories />
        <SortPopap />
      </Container>
    </div>
  )
}
