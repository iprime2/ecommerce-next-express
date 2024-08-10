import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const getAllColors = async (req: Request, res: Response) => {
  try {
    const colors = await prisma.color.findMany();
    res.status(200).json(colors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve colors' });
  }
};

export const getColorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const color = await prisma.color.findUnique({ where: { id } });
    if (!color) {
      return res.status(404).json({ error: 'Color not found' });
    }
    res.status(200).json(color);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve color' });
  }
};

export const createColor = async (req: Request, res: Response) => {
  const { name, value } = req.body;
  try {
    const color = await prisma.color.create({ data: { name, value } });
    res.status(201).json(color);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create color' });
  }
};

export const updateColorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, value } = req.body;
  try {
    const color = await prisma.color.update({
      where: { id },
      data: { name, value },
    });
    res.status(200).json(color);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update color' });
  }
};

export const deleteColorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.color.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete color' });
  }
};
