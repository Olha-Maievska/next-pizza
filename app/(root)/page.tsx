import {
  Container,
  Title,
  TopBar,
  Filters,
  ProductGroupList,
} from '@/shared/components/shared'
import { prisma } from '@/prisma/prisma-client'

export default async function Home() {
  const category = await prisma.category.findMany({
    include: {
      products: {
        include: {
          items: true,
          ingredients: true,
        },
      },
    },
  })

  return (
    <>
      <Container className="mt-10">
        <Title text="All pizzas" size="md" className="font-extrabold" />
      </Container>
      <TopBar categories={category} />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {category.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      products={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
