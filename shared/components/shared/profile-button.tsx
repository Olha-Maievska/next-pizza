import { useSession } from 'next-auth/react'
import React from 'react'
import { Button } from '../ui'
import { CircleUser, User } from 'lucide-react'
import { ClearButton } from './clear-button'
import Link from 'next/link'

interface Props {
  className?: string
  onClickSignIn?: () => void
}

export const ProfileButton: React.FC<Props> = ({
  className,
  onClickSignIn,
}) => {
  const { data: session } = useSession()
  return (
    <div className={className}>
      {!session ? (
        <Button
          className="flex items-center gap-1"
          variant={'outline'}
          onClick={onClickSignIn}
        >
          <User size={18} />
          Log in
        </Button>
      ) : (
        <Link href={'/profile'}>
          <Button className="flex items-center gap-2" variant={'secondary'}>
            <CircleUser size={18} />
            Profile
          </Button>
        </Link>
      )}
    </div>
  )
}
