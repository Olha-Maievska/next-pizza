import {
  Container,
  Title,
  TopBar,
  Filters,
  ProductGroupList,
} from '@/shared/components/shared'
import { Suspense } from 'react'
import { findPizzas } from '@/shared/lib'
import { GetsSearchsParams } from '@/shared/lib/find-pizzas'

export default async function Home({
  searchParams,
}: {
  searchParams: GetsSearchsParams
}) {
  const search = await searchParams
  const categories = await findPizzas(search)

  return (
    <>
      <Container className="mt-10">
        <Title text="All pizzas" size="md" className="font-extrabold" />
      </Container>
      <TopBar categories={categories} />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
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
