import {
  CheckoutCartItem,
  CheckoutContentBlock,
  CheckoutItemDetails,
  Container,
  Title,
} from '@/shared/components/shared'
import { Button, Input } from '@/shared/components/ui'
import { Textarea } from '@/shared/components/ui/textarea'
import { ArrowRight, Package, Truck } from 'lucide-react'

export default function CheckoutPage() {
  return (
    <Container className="mt-10">
      <Title text="Checkout" className="font-extrabold mb-8 text-[36px]" />

      <div className="flex gap-10">
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <CheckoutContentBlock title="1. Cart details">
            <div className="flex flex-col gap-5"></div>
            <CheckoutCartItem />
          </CheckoutContentBlock>

          <CheckoutContentBlock title="2. Personal details">
            <div className="grid grid-cols-2 gap-5">
              <Input
                className="text-base"
                name="firstName"
                placeholder="First name"
              />
              <Input
                className="text-base"
                name="lastName"
                placeholder="Last name"
              />
              <Input className="text-base" name="email" placeholder="Email" />
              <Input className="text-base" name="phone" placeholder="Phone" />
            </div>
          </CheckoutContentBlock>

          <CheckoutContentBlock title="3. Address details">
            <div className="flex flex-col gap-5">
              <Input
                className="text-base"
                name="address"
                placeholder="Addres ..."
              />
              <Textarea
                className="text-base"
                rows={5}
                placeholder="Comments (optional)"
              />
            </div>
          </CheckoutContentBlock>
        </div>

        <div className="w-[450px]">
          <CheckoutContentBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
              <span className="text-xl">Total amount:</span>
              <span className="font-extrabold text-[34px]">105 $</span>
            </div>

            <div>
              <CheckoutItemDetails
                title="Cost of goods"
                value="105 $"
                icon={<Package size={18} className="mr-2 text-gray-400" />}
              />
              <CheckoutItemDetails
                title="Delivery"
                value="Free"
                icon={<Truck size={18} className="mr-2 text-gray-400" />}
              />
            </div>
            <Button
              type="submit"
              className="w-full h-14 mt-6 rounded-2xl text-base font-bold"
            >
              Proceed to payment
              <ArrowRight className="ml-2 w-5" />
            </Button>
          </CheckoutContentBlock>
        </div>
      </div>
    </Container>
  )
}
