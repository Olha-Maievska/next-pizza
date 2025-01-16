export const categories = [
  { name: 'Pizzas' },
  { name: 'Breakfast' },
  { name: 'Snacks' },
  { name: 'Cocktails' },
  { name: 'Hot drinks' },
]

export const ingredients = [
  {
    name: 'Cheese rim',
    price: 3,
    imageUrl: '/images/ingredients/сheese-rim.png',
  },
  {
    name: 'Creamy mozzarella',
    price: 2,
    imageUrl: '/images/ingredients/сreamy-mozzarella.png',
  },
  {
    name: 'Cheddar and parmesan cheeses',
    price: 3,
    imageUrl: '/images/ingredients/сheddar-parmesan.png',
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
    price: 2,
    imageUrl: '/images/ingredients/champignons.png',
  },
  {
    name: 'Ham',
    price: 3,
    imageUrl: '/images/ingredients/ham.png',
  },
  {
    name: 'Spicy Pepperoni',
    price: 2,
    imageUrl: '/images/ingredients/spicy-pepperoni.png',
  },
  {
    name: 'Spicy Chorizo',
    price: 3,
    imageUrl: '/images/ingredients/spicy-chorizo.png',
  },
  {
    name: 'Pickles',
    price: 1,
    imageUrl: '/images/ingredients/pickles.png',
  },
  {
    name: 'Fresh tomatoes',
    price: 1,
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
    imageUrl: '/images/ingredients/sweet-peppers.png',
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
    imageUrl: '/images/products/breakfast/ham-mushrooms.avif',
    description:
      'Hot hearty omelette with crispy crust, ham, mushrooms and mozzarella.',
    weight: '110g',
    categoryId: 2,
  },
  {
    name: 'Pepperoni Omelette',
    imageUrl: '/images/products/breakfast/ham-papperoni.avif',
    description:
      'A hearty and balanced breakfast - crispy omelet, spicy pepperoni, tomatoes and mozzarella.',
    weight: '110g',
    categoryId: 2,
  },
  {
    name: 'Omelette with bacon',
    imageUrl: '/images/products/breakfast/omelette-bacon.avif',
    description:
      'A classic combination of hot omelette with crispy crust and bacon with added mozzarella and tomatoes for breakfast',
    weight: '130g',
    categoryId: 2,
  },
  {
    name: 'Danwich Ham and Cheese',
    imageUrl: '/images/products/snacks/danwich.webp',
    description:
      'Toasted ciabatta and the familiar combination of ham, chicken, mozzarella with fresh tomatoes, ranch dressing and garlic.',
    weight: '210g',
    categoryId: 3,
  },
  {
    name: 'Danwich chorizo ​​bbq',
    imageUrl: '/images/products/snacks/danwich-chorizo-bbq.avif',
    description:
      'The rich flavor of spicy chorizo ​​sausages and zesty pepperoni with burger and barbecue sauces, fresh tomatoes, pickles, mozzarella and onions on a golden-brown ciabatta.',
    weight: '210g',
    categoryId: 3,
  },
  {
    name: 'Chicken Nuggets',
    imageUrl: '/images/products/snacks/chicken-nuggets.avif',
    description: 'Tender chicken meat in crispy breading.',
    weight: '110g',
    categoryId: 3,
  },
  {
    name: 'Baked Potatoes with Sauce',
    imageUrl: '/images/products/snacks/french-potatoes.webp',
    description:
      'Oven baked potatoes with spicy spices. Cheese sauce included.',
    weight: '100g',
    categoryId: 3,
  },
  {
    name: 'Dodster',
    imageUrl: '/images/products/snacks/dodster.webp',
    description:
      'Legendary hot appetizer with chicken, tomatoes, mozzarella, ranch sauce in a thin wheat tortilla',
    weight: '210g',
    categoryId: 3,
  },
  {
    name: 'Spicy Dodster',
    imageUrl: '/images/products/snacks/spicy-dodster.webp',
    description:
      'Hot appetizer with chicken, jalapeno pepper, pickles, tomatoes, mozzarella and barbecue sauce in a thin wheat flatbread.',
    weight: '190g',
    categoryId: 3,
  },
  {
    name: 'Banana Milkshake',
    imageUrl: '/images/products/cocktails/banana.jpg',
    description:
      'The creamy coolness of a classic milkshake with the addition of banana flavor',
    weight: '0.3l',
    categoryId: 4,
  },
  {
    name: 'Caramel Apple Milkshake',
    imageUrl: '/images/products/cocktails/caramel.jpg',
    description:
      'Summer is always near: delicious caramel apple, milk and ice cream',
    weight: '0.3l',
    categoryId: 4,
  },
  {
    name: 'Oreo Cookie Milkshake',
    imageUrl: '/images/products/cocktails/oreo.jpg',
    description:
      'The very same Oreo cookie in a convenient ice milkshake format',
    weight: '0.3l',
    categoryId: 4,
  },
  {
    name: 'Classic Milkshake',
    imageUrl: '/images/products/cocktails/classic.jpg',
    description: "It's a classic: milk, ice cream and nothing extra.",
    weight: '03.l',
    categoryId: 4,
  },
  {
    name: 'Caramel Cappuccino Coffee',
    imageUrl: '/images/products/drinks/caramel.webp',
    description: 'Classic cappuccino with milk foam and caramel syrup.',
    weight: '0.3l',
    categoryId: 5,
  },
  {
    name: 'Coconut Latte Coffee',
    imageUrl: '/images/products/drinks/coconut.webp',
    description: 'Hot Latte with Coconut Syrup',
    weight: '03.l',
    categoryId: 5,
  },
  {
    name: 'Americano Coffee',
    imageUrl: '/images/products/drinks/americano.webp',
    description: 'Hot coffee for connoisseurs of pure taste.',
    weight: '03.l',
    categoryId: 5,
  },
  {
    name: 'Latte Coffee',
    imageUrl: '/images/products/drinks/latte.webp',
    description:
      'A perfectly balanced combination of coffee, an increased portion of milk and the most delicate foam.',
    weight: '03.l',
    categoryId: 5,
  },
]
