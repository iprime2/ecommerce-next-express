# Full Stack E-Commerce Store with Next.js 14, App Router, Nodejs, Expressjs, Typescript, Postgres, Docker, PrismaORM, Github Actions and Tailwind.

#### http://ec2-3-111-188-77.ap-south-1.compute.amazonaws.com:3000

## walkthrough videos

https://drive.google.com/file/d/1ocj5d3Mh3zEK6rSiUPy5u0le9JNN77ts/view?usp=sharing

![image](https://github.com/user-attachments/assets/2e0631d6-f8bb-49c6-8022-625fc1cafd38)

### Features:

- Buyer can explore product from home page
- Buyer can search the product from search bar in navbar
- Buyer add product to cart
- Buyer/ Seller can change theme from navbar
- Seller can login and acces dashboard to see charts of sales
- Seller can create/update producte with product image from admin panel 

### Prerequisites

**Node version 14.x**
**npm**
**pnpm** (Optinal)
**Docker** (optinal)

### Cloning the repository

```shell
git clone https://github.com/iprime2/ecommerce-next-express.git
```

### Install pnpm (optional)
```shell
npm install pnpm@latest
```

### Setup Database Conatiner
```shell
docker compose up
```

## Setup Backend

### Change Directory

```shell
cd backend
```

### Install packages

```shell
npm/pnpm install
```

### Setup .env file (create .env file in backend folder)

```js
PORT=5000
DATABASE_URL="postgresql://postgres:test1234@localhost:5432/ecommerce?schema=public"
SESSION_SECRET= "test"
NODE_ENV="local"
JWT_SECRET="test"
```
 
### Setup Prisma

```shell
npx prisma migrate dev
npx prisma generate

```

### Start the app

```shell
npm/pnpm run dev
```

## Setup Frontend

### Change Directory

```shell
cd frontend
```

### Install packages

```shell
npm/pnpm install
```

### Setup .env file (create .env file in frontend folder)

```js
LOCALHOST='http://localhost:5000'
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME='dehrep5or'
CLOUDINARY_URL='cloudinary://199914391145468:oQpPzw9JSNP02GLL7lXnvuOhw5w@dehrep5or'
```

### Start the app

```shell
npm/pnpm run dev
```

## API Documnetations
To write API documentation for your GitHub README file, you can follow a format like this:

### Categories
- **GET /api/categories**
  - Description: Get all categories.
  - Response: Array of category objects.

- **GET /api/categories/:id**
  - Description: Get a category by ID.
  - Parameters:
    - id: Category ID.
  - Response: Category object.

- **POST /api/categories**
  - Description: Create a new category.
  - Request Body: { name: string }
  - Response: Created category object.

- **PUT /api/categories/:id**
  - Description: Update a category by ID.
  - Parameters:
    - id: Category ID.
  - Request Body: { name: string }
  - Response: Updated category object.

- **DELETE /api/categories/:id**
  - Description: Delete a category by ID.
  - Parameters:
    - id: Category ID.
  - Response: No content.

### Products
- **GET /api/products**
  - Description: Get all products.
  - Response: Array of product objects.

- **GET /api/products/:id**
  - Description: Get a product by ID.
  - Parameters:
    - id: Product ID.
  - Response: Product object.

- **POST /api/products**
  - Description: Create a new product.
  - Request Body: { name: string, description: string, price: number, ... }
  - Response: Created product object.

- **PUT /api/products/:id**
  - Description: Update a product by ID.
  - Parameters:
    - id: Product ID.
  - Request Body: { name: string, description: string, price: number, ... }
  - Response: Updated product object.

- **DELETE /api/products/:id**
  - Description: Delete a product by ID.
  - Parameters:
    - id: Product ID.
  - Response: No content.
  - 

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
| `lint`          | Check any javascript error               |
| `build`         | To build the webapp                      |
