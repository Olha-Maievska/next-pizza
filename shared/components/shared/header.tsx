'use client'

import { cn } from '@/shared/lib/utils'
import React, { useEffect } from 'react'
import { Container } from './container'
import Image from 'next/image'
import Link from 'next/link'
import { SearchInput } from './search-input'
import { CartButton } from './cart-button'
import { useSearchParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { ProfileButton } from './profile-button'
import { AuthModal } from './modals'

interface Props {
  hasSearch?: boolean
  hasCart?: boolean
  className?: string
}

export const Header: React.FC<Props> = ({ className, hasSearch, hasCart }) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [openAuthModal, setOpenAuthModal] = React.useState(false)

  useEffect(() => {
    let message = ''

    if (searchParams.has('paid')) {
      message = 'The order has been paid successfully!'
    }

    if (searchParams.has('verified')) {
      message = 'Email verified successfully!'
    }

    if (message) {
      setTimeout(() => {
        router.replace('/')
        toast.success(message, {
          duration: 3000,
        })
      }, 500)
    }
  }, [router, searchParams])

  return (
    <header className={cn('border-b', className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href={'/'}>
          <div className="flex items-center gap-4">
            <Image src="/images/logo.png" alt="Logo" width={35} height={35} />
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
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

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
