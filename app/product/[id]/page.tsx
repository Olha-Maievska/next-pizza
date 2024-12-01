import { Container, ProductImage, Title } from '@/components/shared'
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
    <>
      <Container className="mt-10">
        <Title text="All pizzas" size="md" className="font-extrabold" />
      </Container>

      <Container className="my-10 flex flex-col">
        <ProductImage imageUrl={product.imageUrl} size={40} />
      </Container>
    </>
  )
}
