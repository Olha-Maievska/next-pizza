'use client'

import { cn } from '@/shared/lib/utils'
import React, { useEffect } from 'react'
import { Container } from './container'
import Image from 'next/image'
import { Button } from '../ui'
import { User } from 'lucide-react'
import Link from 'next/link'
import { SearchInput } from './search-input'
import { CartButton } from './cart-button'
import { useSearchParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useSession, signIn } from 'next-auth/react'

interface Props {
  hasSearch?: boolean
  hasCart?: boolean
  className?: string
}

export const Header: React.FC<Props> = ({ className, hasSearch, hasCart }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (searchParams.has('paid')) {
      setTimeout(() => {
        toast.success('The order has been paid successfully!')
        router.push('/')
      }, 500)
    }
  }, [])

  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href={'/'}>
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="font-black text-2xl uppercase">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                Couldn&apos;t be more delicious!
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        <div className="flex items-center gap-3">
          <Button
            variant={'outline'}
            className="flex items-center gap-1"
            onClick={() =>
              signIn('github', {
                callbackUrl: '/',
                redirect: true,
              })
            }
          >
            Log in <User size={16} />
          </Button>

          {hasCart && (
            <div>
              <CartButton />
            </div>
          )}
        </div>
      </Container>
    </header>
  )
}
