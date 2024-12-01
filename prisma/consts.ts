export const categories = [
  { name: 'Pizzas' },
  { name: 'Breakfast' },
  { name: 'Snacks' },
  { name: 'Cocktails' },
  { name: 'Drinks' },
]

export const ingredients = [
  {
    name: 'Cheese rim',
    price: 3,
    imageUrl: '/images/ingredients/cheese-rim.png',
  },
  {
    name: 'Creamy mozzarella',
    price: 4,
    imageUrl: '/images/ingredients/mozzarella.png',
  },
  {
    name: 'Cheddar and parmesan cheeses',
    price: 4,
    imageUrl: '/images/ingredients/cheddar-parmesan.png',
  },
  {
    name: 'Hot Jalapeno Pepper',
    price: 2,
    imageUrl: '/images/ingredients/hot-jalapeno-pepper.png',
  },
  {
    name: 'Tender Chicken',
    price: 5,
    imageUrl: '/images/ingredients/tender-chicken.png',
  },
  {
    name: 'Champignons',
    price: 3,
    imageUrl: '/images/ingredients/champignons.png',
  },
  {
    name: 'Ham',
    price: 4,
    imageUrl: '/images/ingredients/ham.png',
  },
  {
    name: 'Spicy Pepperoni',
    price: 5,
    imageUrl: '/images/ingredients/spicy-pepperoni.png',
  },
  {
    name: 'Spicy Chorizo',
    price: 4,
    imageUrl: '/images/ingredients/spicy-chorizo.png',
  },
  {
    name: 'Pickles',
    price: 2,
    imageUrl: '/images/ingredients/pickles.png',
  },
  {
    name: 'Fresh tomatoes',
    price: 3,
    imageUrl: '/images/ingredients/tomatoes.png',
  },
  {
    name: 'Red onion',
    price: 1,
    imageUrl: '/images/ingredients/red-onion.png',
  },
  {
    name: 'Juicy Pineapples',
    price: 3,
    imageUrl: '/images/ingredients/pineapples.png',
  },
  {
    name: 'Italian Herbs',
    price: 1,
    imageUrl: '/images/ingredients/italian-herbs.png',
  },
  {
    name: 'Sweet Peppers',
    price: 2,
    imageUrl: '/images/ingredients/sweet-pepper.png',
  },
  {
    name: 'Feta Cheese Cubes',
    price: 3,
    imageUrl: '/images/ingredients/feta-cheese.png',
  },
  {
    name: 'Meatballs',
    price: 5,
    imageUrl: '/images/ingredients/meatballs.png',
  },
].map((obj, index) => ({ id: index + 1, ...obj }))

export const products = [
  {
    name: 'Ham and Mushroom Omelette',
    imageUrl: '/images/products/breakfast/ham-mushrooms.jpg',
    categoryId: 2,
  },
  {
    name: 'Pepperoni Omelette',
    imageUrl: '/images/products/breakfast/ham-papperoni.jpg',
    categoryId: 2,
  },
  {
    name: 'Danwich Ham and Cheese',
    imageUrl: '/images/products/snacks/danwich.webp',
    categoryId: 3,
  },
  {
    name: 'Chicken Nuggets',
    imageUrl: '/images/products/snacks/chicken-nuggets.jpg',
    categoryId: 3,
  },
  {
    name: 'Baked Potatoes with Sauce',
    imageUrl: '/images/products/snacks/french-potatoes.webp',
    categoryId: 3,
  },
  {
    name: 'Dodster',
    imageUrl: '/images/products/snacks/dodster.webp',
    categoryId: 3,
  },
  {
    name: 'Spicy Dodster',
    imageUrl: '/images/products/snacks/spicy-dodster.webp',
    categoryId: 3,
  },
  {
    name: 'Banana Milkshake',
    imageUrl: '/images/products/cocktails/banana.jpg',
    categoryId: 4,
  },
  {
    name: 'Caramel Apple Milkshake',
    imageUrl: '/images/products/cocktails/caramel.jpg',
    categoryId: 4,
  },
  {
    name: 'Oreo Cookie Milkshake',
    imageUrl: '/images/products/cocktails/oreo.jpg',
    categoryId: 4,
  },
  {
    name: 'Classic Milkshake',
    imageUrl: '/images/products/cocktails/classic.jpg',
    categoryId: 4,
  },
  {
    name: 'Caramel Cappuccino Coffee',
    imageUrl: '/images/products/drinks/caramel.webp',
    categoryId: 5,
  },
  {
    name: 'Coconut Latte Coffee',
    imageUrl: '/images/products/drinks/coconut.webp',
    categoryId: 5,
  },
  {
    name: 'Americano Coffee',
    imageUrl: '/images/products/drinks/americano.webp',
    categoryId: 5,
  },
  {
    name: 'Latte Coffee',
    imageUrl: '/images/products/drinks/latte.webp',
    categoryId: 5,
  },
]
