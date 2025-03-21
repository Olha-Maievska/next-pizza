import {
  Container,
  Title,
  TopBar,
  Filters,
  ProductGroupList,
  Stories,
} from '@/shared/components/shared'
import React, { Suspense } from 'react'
import { findPizzas } from '@/shared/lib'
import { GetsSearchsParams } from '@/shared/lib/find-pizzas'

export default async function Home({
  searchParams,
}: {
  searchParams: GetsSearchsParams
}) {
  const params = await searchParams
  const categories = await findPizzas(params)

  return (
    <>
      <Container className="mt-10">
        <Title text="All pizzas" size="md" className="font-extrabold" />
      </Container>
      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0
        )}
      />

      <Stories />

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
                      className="first:pt-0 pt-[100px]"
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
