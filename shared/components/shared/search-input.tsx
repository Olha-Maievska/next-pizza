'use client'

import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { useClickAway, useDebounce } from 'react-use'
import Link from 'next/link'
import { Api } from '@/shared/services/api-client'
import { Product } from '@prisma/client'

interface Props {
  className?: string
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [focused, setFocused] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const ref = React.useRef<HTMLInputElement>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useClickAway(ref, () => {
    setFocused(false)
  })

  useDebounce(
    async () => {
      try {
        const response = await Api.products.search(searchQuery)
        setProducts(response)
      } catch (error) {
        console.log(error)
      }
    },
    250,
    [searchQuery]
  )

  const onClickItem = () => {
    setFocused(false)
    setSearchQuery('')
    setProducts([])
  }

  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30"></div>
      )}

      <div
        className={cn(
          'relative flex flex-1 justify-between h-11 rounded-2xl z-30',
          className
        )}
        ref={ref}
      >
        <Search className="absolute top-1/2 left-3 translate-y-[-50%] h-5 text-gray-400" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search"
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          onFocus={() => setFocused(true)}
        />

        {products.length > 0 && (
          <div
            className={cn(
              'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
              focused && 'visible opacity-100 top-12'
            )}
          >
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="flex items-center gap-3 px-3 py-2 hover:bg-primary/10"
                onClick={onClickItem}
              >
                <img
                  className="rounded-sm h-8 w-8"
                  src={product.imageUrl}
                  alt={product.name}
                />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
