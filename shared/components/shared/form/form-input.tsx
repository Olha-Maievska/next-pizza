import React from 'react'
import { RequiredSymbol } from '../required-symbol'
import { Input } from '../../ui'

interface Props {
  className?: string
  name?: string
  label?: string
  required?: boolean
}

export const FormInput: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <p>
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input className="h-12 text-md" {...props} />
      </div>
    </div>
  )
}
