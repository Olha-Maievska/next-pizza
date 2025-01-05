import React from 'react'

interface Props {
  className?: string
}

export const UnauthtorizedPage: React.FC<Props> = ({ className }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Доступ запрещён"
        text="Данную страницу могут просматривать только авторизованные пользователи"
        imageUrl="/assets/images/lock.png"
      />
    </div>
  )
}
