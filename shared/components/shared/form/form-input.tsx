import React from 'react'

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
}) => {
  return (
    <div className={className}>
      {label && (
        <p>
          {label}
          {required && ' *'}
        </p>
      )}
    </div>
  )
}
