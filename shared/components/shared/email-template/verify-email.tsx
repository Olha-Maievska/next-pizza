import * as React from 'react'

export interface Props {
  code: string
}

export const VerifyEmailTemplate: React.FC<Props> = ({ code }) => (
  <div>
    <p>Do not share this code with anyone. Verification code: </p>
    <p>
      <b className="text-2xl">{code}</b>
    </p>
    <p>
      <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>
        Confirm registration
      </a>
    </p>
    <p className="font-bold">Next Pizza team!</p>
  </div>
)
