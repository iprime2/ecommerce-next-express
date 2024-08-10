import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        size: true,
        color: true,
        images: true,
      },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        size: true,
        color: true,
        images: true,
      },
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve product' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const {
    name,
    description,
    price,
    discount,
    categoryId,
    sizeId,
    colorId,
    sellerId,
    images,
    isFeatured,
    isArchived,
  } = req.body;
  try {
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        discount,
        categoryId,
        sizeId,
        colorId,
        sellerId,
        isFeatured,
        isArchived,
        images: {
          createMany: {
            data: images?.map((image: { url: string }) => ({
              url: image.url,
            })),
          },
        },
      },
    });
    res.status(201).json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]:"+ error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    discount,
    categoryId,
    sizeId,
    colorId,
    isFeatured,
    isArchived,
    images,
  } = req.body;
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        discount,
        categoryId,
        sizeId,
        colorId,
        isFeatured,
        isArchived,
        images: {
          deleteMany: {},
          create: images.map((image: { url: string }) => ({ url: image.url })),
        },
      },
      include: {
        category: true,
        size: true,
        color: true,
        images: true,
      },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.product.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};


export const searchProduct = async (req: Request, res: Response) => {
  const { query, category } = req.query;

  console.log(query);

  try {
    let products;
    if (category) {
      products = await prisma.product.findMany({
        where: {
          AND: [
            //@ts-ignore
            { name: { contains: query, mode: 'insensitive' } },
            //@ts-ignore
            { category: { name: { equals: category, mode: 'insensitive' } } },
          ],
        },
        include: {
          category: true,
          images: true,
          size: true,
          color: true,
        },
      });
    } else {
      products = await prisma.product.findMany({
        where: {
          //@ts-ignore
          name: { contains: query, mode: 'insensitive' },
        },
        include: {
          category: true,
          images: true,
          size: true,
          color: true,
        },
      });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Search Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
