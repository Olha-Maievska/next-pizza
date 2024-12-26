'use client'

import {
  CheckoutCartItem,
  CheckoutContentBlock,
  CheckoutSidebar,
  Container,
  Title,
} from '@/shared/components/shared'
import { FormInput } from '@/shared/components/shared/form'
import { Input } from '@/shared/components/ui'
import { Textarea } from '@/shared/components/ui/textarea'
import { PizzaSize, PizzaType } from '@/shared/consts/pizza'
import { useCart } from '@/shared/hooks'
import { getCartItemDetails } from '@/shared/lib'

const del_price = 9

export default function CheckoutPage() {
  const {
    cartState: { cartItems, totalAmount, removeCartItem },
    onClickCountBtn,
  } = useCart()

  return (
    <Container className="mt-10">
      <Title text="Checkout" className="font-extrabold mb-8 text-[36px]" />

      <div className="flex gap-10">
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <CheckoutContentBlock title="1. Cart details">
            <div className="flex flex-col gap-5">
              {cartItems.map((item) => (
                <CheckoutCartItem
                  key={item.id}
                  id={item.id}
                  imageUrl={item.imageUrl}
                  name={item.name}
                  price={item.price}
                  details={getCartItemDetails(
                    item.ingredients,
                    item.pizzaType as PizzaType,
                    item.size as PizzaSize
                  )}
                  quantity={item.quantity}
                  disabled={item.disabled}
                  onClickCountBtn={(type) =>
                    onClickCountBtn(item.id, item.quantity, type)
                  }
                  onClickRemove={() => removeCartItem(item.id)}
                />
              ))}
            </div>
          </CheckoutContentBlock>

          <CheckoutContentBlock title="2. Personal details">
            <div className="grid grid-cols-2 gap-5">
              <FormInput
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

        <CheckoutSidebar totalAmount={totalAmount} deliveryPrice={del_price} />
      </div>
    </Container>
  )
}
