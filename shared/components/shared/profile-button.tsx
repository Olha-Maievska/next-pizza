import { useSession } from 'next-auth/react'
import React from 'react'
import { Button } from '../ui'
import { CircleUser, Loader, User } from 'lucide-react'
import Link from 'next/link'
import { useIngredients } from '@/shared/hooks'

interface Props {
  className?: string
  onClickSignIn?: () => void
}

export const ProfileButton: React.FC<Props> = ({
  className,
  onClickSignIn,
}) => {
  const { loading } = useIngredients()

  const { data: session } = useSession()
  return (
    <div className={className}>
      {!session ? (
        <Button
          className="flex items-center gap-1 w-[90px]"
          variant={'outline'}
          onClick={onClickSignIn}
        >
          {loading ? (
            <Loader className="w-4 h-4 animate-spin" color="#ff7700" />
          ) : (
            <>
              <User size={18} />
              Log in
            </>
          )}
        </Button>
      ) : (
        <Link href={'/profile'}>
          <Button
            className="flex items-center gap-2 w-[90px]"
            variant={'secondary'}
          >
            {loading ? (
              <Loader className="w-4 h-4 animate-spin" color="#ff7700" />
            ) : (
              <>
                <CircleUser size={18} />
                Profile
              </>
            )}
          </Button>
        </Link>
      )}
    </div>
  )
}
