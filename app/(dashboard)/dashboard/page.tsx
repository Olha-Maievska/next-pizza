import { Container, Title } from '@/components/shared'

export default async function Dashboard() {
  return (
    <>
      <Container className="mt-10">
        <Title text="All pizzas" size="md" className="font-extrabold" />
      </Container>
    </>
  )
}
