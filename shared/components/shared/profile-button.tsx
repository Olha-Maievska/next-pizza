import { useSession } from 'next-auth/react'
import React from 'react'
import { Button } from '../ui'
import { CircleUser, User } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/shared/store'

interface Props {
  className?: string
  onClickSignIn?: () => void
}

export const ProfileButton: React.FC<Props> = ({
  className,
  onClickSignIn,
}) => {
  const loading = useCartStore((state) => state.loading)

  const { data: session } = useSession()
  return (
    <div className={className}>
      {!session ? (
        <Button
          loading={loading}
          className="flex items-center gap-1 w-[90px]"
          variant={'outline'}
          onClick={onClickSignIn}
        >
          <User size={18} />
          Log in
        </Button>
      ) : (
        <Link href={'/profile'}>
          <Button
            className="flex items-center gap-2 w-[90px]"
            variant={'secondary'}
            loading={loading}
          >
            <CircleUser size={18} />
            Profile
          </Button>
        </Link>
      )}
    </div>
  )
}
