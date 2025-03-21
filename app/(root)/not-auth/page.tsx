import { InfoBlock } from '@/shared/components/shared'

export default function unauthtorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <InfoBlock
        title="Access denied"
        text="This page can only be viewed by authorized users."
        imageUrl="/images/lock.png"
      />
    </div>
  )
}
