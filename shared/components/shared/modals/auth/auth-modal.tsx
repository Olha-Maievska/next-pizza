import { Button, Dialog } from '@/shared/components/ui'
import { DialogContent, DialogTitle } from '@/shared/components/ui/dialog'
import { signIn } from 'next-auth/react'
import React from 'react'
import { LoginForm } from './forms/login-form'
import { RegisterForm } from './forms/register-form'

interface Props {
  className?: string
  open: boolean
  onClose: () => void
}

export const AuthModal: React.FC<Props> = ({ onClose, open }) => {
  const [type, setType] = React.useState<'login' | 'register'>('login')

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login')
  }
  const handleClose = () => {
    onClose()
  }
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        <DialogTitle className="hidden">Auth modal</DialogTitle>
        {type === 'login' ? (
          <LoginForm onClose={onClose} />
        ) : (
          <RegisterForm onClose={onClose} />
        )}

        <hr />
        <div className="flex gap-2">
          <Button
            className="gap-2 h-12 p-2 flex-1"
            variant="secondary"
            type="button"
            onClick={() => {
              signIn('github', {
                callbackUrl: '/',
                redirect: true,
              })
            }}
          >
            <img
              src="https://github.githubassets.com/favicons/favicon.svg"
              alt="github"
            />
            Github
          </Button>

          <Button
            className="gap-2 h-12 p-2 flex-1"
            variant="secondary"
            type="button"
            onClick={() => {
              signIn('google', {
                callbackUrl: '/',
                redirect: true,
              })
            }}
          >
            <img
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              alt="google"
            />
            Google
          </Button>
        </div>
        <Button
          className="mt-4 h-12"
          variant="outline"
          type="button"
          onClick={onSwitchType}
        >
          {type !== 'login' ? 'Sign in' : 'Sign up'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
