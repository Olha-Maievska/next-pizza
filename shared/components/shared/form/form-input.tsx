import React from 'react'
import { Input } from '../../ui'
import { ErrorText, RequiredSymbol } from '../index'

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

      <ErrorText text="This field is required" />
    </div>
  )
}
