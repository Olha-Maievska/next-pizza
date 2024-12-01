import {
  Container,
  GroupVariant,
  ProductImage,
  Title,
} from '@/components/shared'
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } })

  if (!product) {
    return notFound()
  }

  return (
    <Container className="my-10 flex flex-col">
      <div className="flex flex-1">
        <ProductImage imageUrl={product.imageUrl} size={40} />

        <div className="w-[490px] bg-primary/5 p-7">
          <Title
            text={product.name}
            size="md"
            className="font-extrabold mb-1"
          />

          <p className="text-gray-400">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo,
            temporibus unde veniam, exercitationem dolorem culpa asperiores
            consectetur sint, quia sapiente labore vel! Consectetur, quis
            ratione deserunt magni officiis pariatur porro?
          </p>

          <GroupVariant
            items={[
              {
                name: 'Small',
                value: '1',
              },
              {
                name: 'Medium',
                value: '2',
              },
              {
                name: 'Large',
                value: '3',
              },
            ]}
            selectedValue="2"
          />
        </div>
      </div>
    </Container>
  )
}
