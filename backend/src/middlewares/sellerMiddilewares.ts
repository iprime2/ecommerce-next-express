import { Request, Response, NextFunction } from 'express';

export const sellerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
  if (!req.user || req.user.role !== 'SELLER') {
    return res.status(403).json({ error: 'Access denied. Only sellers can perform this action.' });
  }
  next();
};
