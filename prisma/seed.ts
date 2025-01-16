import { hashSync } from 'bcrypt'
import { prisma } from './prisma-client'
import { ingredients, categories, products } from './consts'
import { Prisma } from '@prisma/client'

const generateProductItem = ({
  productId,
  pizzaType,
  size,
  price,
}: {
  productId: number
  pizzaType?: 1 | 2
  size?: 20 | 30 | 40
  price: number
}) => {
  return {
    productId,
    price,
    pizzaType,
    size,
  } as Prisma.ProductItemUncheckedCreateInput
}

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullname: 'User',
        email: 'user@test.com',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'USER',
      },
      {
        fullname: 'Admin',
        email: 'admin@test.com',
        password: hashSync('111111', 10),
        verified: new Date(),
        role: 'ADMIN',
      },
    ],
  })

  await prisma.category.createMany({
    data: categories,
  })

  await prisma.ingredient.createMany({
    data: ingredients,
  })

  await prisma.product.createMany({
    data: products,
  })

  const pizza1 = await prisma.product.create({
    data: {
      name: 'Pepperoni fresh',
      imageUrl: '/images/products/pizzas/pepperoni.webp',
      description:
        'Spicy pepperoni, extra mozzarella, tomatoes, signature tomato sauce.',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(0, 5),
      },
    },
  })

  const pizza2 = await prisma.product.create({
    data: {
      name: 'Cheese',
      imageUrl: '/images/products/pizzas/cheese.webp',
      description:
        'Mozzarella, cheddar and parmesan cheeses, signature alfredo sauce.',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(5, 10),
      },
    },
  })

  const pizza3 = await prisma.product.create({
    data: {
      name: 'Chorizo ​​fresh',
      imageUrl: '/images/products/pizzas/chorizo.webp',
      description:
        'Spicy chorizo ​​sausages, sweet peppers, mozzarella, signature tomato sauce.',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(10, 17),
      },
    },
  })

  const pizza4 = await prisma.product.create({
    data: {
      name: 'Ham and mushrooms',
      imageUrl: '/images/products/pizzas/ham-mushrooms.avif',
      description:
        'Ham, champignons, extra mozzarella, signature tomato sauce.',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(3, 8),
      },
    },
  })

  const pizza5 = await prisma.product.create({
    data: {
      name: 'Burger-pizza',
      imageUrl: '/images/products/pizzas/burger-pizza.avif',
      description:
        'Ham, pickles, tomatoes, red onion, garlic, burger sauce, mozzarella, signature tomato sauce.',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(9, 14),
      },
    },
  })

  const pizza6 = await prisma.product.create({
    data: {
      name: 'Hawaiian',
      imageUrl: '/images/products/pizzas/hawaiian.avif',
      description: 'Chicken, pineapple, mozzarella, signature alfredo sauce',
      categoryId: 1,
      ingredients: {
        connect: ingredients.slice(2, 8),
      },
    },
  })

  await prisma.productItem.createMany({
    data: [
      // Pepperoni fresh
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 1,
        size: 20,
        price: 10,
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 1,
        size: 30,
        price: 12,
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 1,
        size: 40,
        price: 14,
      }),
      generateProductItem({
        productId: pizza1.id,
        pizzaType: 2,
        size: 40,
        price: 15,
      }),

      // Cheese
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 1,
        size: 20,
        price: 10,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 1,
        size: 30,
        price: 11,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 1,
        size: 40,
        price: 13,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 2,
        size: 20,
        price: 9,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 2,
        size: 30,
        price: 12,
      }),
      generateProductItem({
        productId: pizza2.id,
        pizzaType: 2,
        size: 40,
        price: 13,
      }),

      // Chorizo ​​fresh
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 1,
        size: 20,
        price: 11,
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 2,
        size: 20,
        price: 12,
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 2,
        size: 30,
        price: 14,
      }),
      generateProductItem({
        productId: pizza3.id,
        pizzaType: 2,
        size: 20,
        price: 15,
      }),

      // Ham and mushrooms
      generateProductItem({
        productId: pizza4.id,
        pizzaType: 1,
        size: 20,
        price: 8,
      }),
      generateProductItem({
        productId: pizza4.id,
        pizzaType: 1,
        size: 30,
        price: 9,
      }),
      generateProductItem({
        productId: pizza4.id,
        pizzaType: 1,
        size: 40,
        price: 10,
      }),

      // Burger-pizza
      generateProductItem({
        productId: pizza5.id,
        pizzaType: 2,
        size: 20,
        price: 11,
      }),
      generateProductItem({
        productId: pizza5.id,
        pizzaType: 2,
        size: 30,
        price: 13,
      }),
      generateProductItem({
        productId: pizza5.id,
        pizzaType: 2,
        size: 40,
        price: 15,
      }),

      // Hawaiian
      generateProductItem({
        productId: pizza6.id,
        pizzaType: 1,
        size: 20,
        price: 12,
      }),
      generateProductItem({
        productId: pizza6.id,
        pizzaType: 1,
        size: 30,
        price: 13,
      }),
      generateProductItem({
        productId: pizza6.id,
        pizzaType: 1,
        size: 40,
        price: 14,
      }),
      generateProductItem({
        productId: pizza6.id,
        pizzaType: 2,
        size: 20,
        price: 13,
      }),
      generateProductItem({
        productId: pizza6.id,
        pizzaType: 2,
        size: 30,
        price: 14,
      }),
      generateProductItem({
        productId: pizza6.id,
        pizzaType: 2,
        size: 40,
        price: 15,
      }),

      // Rest products
      generateProductItem({ productId: 1, price: 7 }),
      generateProductItem({ productId: 2, price: 6 }),
      generateProductItem({ productId: 3, price: 8 }),
      generateProductItem({ productId: 4, price: 9 }),
      generateProductItem({ productId: 5, price: 10 }),
      generateProductItem({ productId: 6, price: 6 }),
      generateProductItem({ productId: 7, price: 5 }),
      generateProductItem({ productId: 8, price: 11 }),
      generateProductItem({ productId: 9, price: 10 }),
      generateProductItem({ productId: 10, price: 4 }),
      generateProductItem({ productId: 11, price: 5 }),
      generateProductItem({ productId: 12, price: 6 }),
      generateProductItem({ productId: 13, price: 4 }),
      generateProductItem({ productId: 14, price: 3 }),
      generateProductItem({ productId: 15, price: 4 }),
      generateProductItem({ productId: 16, price: 2 }),
      generateProductItem({ productId: 17, price: 2 }),
    ],
  })

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: '111111',
      },

      {
        userId: 2,
        totalAmount: 0,
        token: '2244333',
      },
    ],
  })

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  })

  await prisma.story.createMany({
    data: [
      {
        previewImageUrl: '/images/stories/pizza-fest.jpg',
      },
      {
        previewImageUrl: '/images/stories/smile.jpg',
      },
      {
        previewImageUrl: '/images/stories/especially-for-you.webp',
      },
      {
        previewImageUrl: '/images/stories/facts-about-the-month.jpg',
      },
      {
        previewImageUrl: '/images/stories/coffe-with-friends.jpg',
      },
      {
        previewImageUrl: '/images/stories/no-meat.webp',
      },
    ],
  })

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 85,
        sourceUrl: '/images/stories/slaces-papperoni.webp',
      },
      {
        storyId: 85,
        sourceUrl: '/images/stories/pesto.webp',
      },
      {
        storyId: 86,
        sourceUrl: '/images/stories/smile-2.jpg',
      },
      {
        storyId: 86,
        sourceUrl: '/images/stories/smile-3.webp',
      },
      {
        storyId: 87,
        sourceUrl: '/images/stories/especially-for-you-2.jpg',
      },
      {
        storyId: 87,
        sourceUrl: '/images/stories/especially-for-you-3.jpeg',
      },
      {
        storyId: 87,
        sourceUrl: '/images/stories/cold.jpg',
      },
      {
        storyId: 88,
        sourceUrl: '/images/stories/food-facts.png',
      },
      {
        storyId: 88,
        sourceUrl: '/images/stories/facts-about-pizza-1.png',
      },
      {
        storyId: 88,
        sourceUrl: '/images/stories/pizza-knowledge.png',
      },
      {
        storyId: 88,
        sourceUrl: '/images/stories/national-pizza-day.png',
      },
      {
        storyId: 89,
        sourceUrl: '/images/stories/coffe-with-friends-2.jpg',
      },
      {
        storyId: 89,
        sourceUrl: '/images/stories/coffe-with-friends-3.jpg',
      },
      {
        storyId: 89,
        sourceUrl: '/images/stories/coffe-with-friends-4.webp',
      },
      {
        storyId: 90,
        sourceUrl: '/images/stories/French-Fries.jpg',
      },
      {
        storyId: 90,
        sourceUrl: '/images/stories/white-pizza.jpg',
      },
    ],
  })
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`
}

async function main() {
  try {
    await down()
    await up()
  } catch (error) {
    console.error(error)
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
