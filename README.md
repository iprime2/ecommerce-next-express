# Full Stack E-Commerce Store with Next.js 14, App Router, Nodejs, Expressjs, Typescript, Postgres, Docker, PrismaORM, Github Actions and Tailwind.

#### https://ec2-3-111-188-77.ap-south-1.compute.amazonaws.com:3000

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

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
| `lint`          | Check any javascript error               |
| `build`         | To build the webapp                      |
