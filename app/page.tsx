import {
  Container,
  Title,
  TopBar,
  Filters,
  ProductCard,
  ProductGroupList,
} from '@/components/shared'

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="All pizzas" size="md" className="font-extrabold" />
      </Container>
      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          <div className="w-[250px]">
            <Filters />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductGroupList
                className="mt-10"
                title="Popular pizzas"
                products={[
                  {
                    id: 1,
                    name: 'Cheese Pizza',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                    items: [{ price: 100 }],
                  },
                  {
                    id: 1,
                    name: 'Cheese Pizza',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                    items: [{ price: 100 }],
                  },

                  {
                    id: 2,
                    name: 'Cheese Pizza',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp',
                    items: [{ price: 100 }],
                  },
                ]}
                listClassName="grid-cols-3"
                catedoryId={1}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}
