import {
  Container,
  Title,
  TopBar,
  Filters,
  ProductGroupList,
} from '@/components/shared'

export default function ProductPage({
  params: { id },
}: {
  params: { id: string }
}) {
  return (
    <>
      <Container className="mt-10">
        <Title text="All pizzas" size="md" className="font-extrabold" />
      </Container>
      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">{id}</div>
      </Container>
    </>
  )
}
