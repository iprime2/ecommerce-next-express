import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const getAllSizes = async (req: Request, res: Response) => {
  try {
    const sizes = await prisma.size.findMany();
    res.status(200).json(sizes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve sizes' });
  }
};

export const getSizeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const size = await prisma.size.findUnique({ where: { id } });
    if (!size) {
      return res.status(404).json({ error: 'Size not found' });
    }
    res.status(200).json(size);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve size' });
  }
};

export const createSize = async (req: Request, res: Response) => {
  const { name, value } = req.body;
  try {
    const size = await prisma.size.create({ data: { name, value } });
    res.status(201).json(size);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create size' });
  }
};

export const updateSizeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, value } = req.body;
  try {
    const size = await prisma.size.update({
      where: { id },
      data: { name, value },
    });
    res.status(200).json(size);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update size' });
  }
};

export const deleteSizeById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.size.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete size' });
  }
};
