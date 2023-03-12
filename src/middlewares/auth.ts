import { Request, Response, NextFunction } from 'express';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({message: 'Missing authorization header'});
  const [_, b64auth] = authorization.split(' ');
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
  if (!login || !password || login !== process.env.BASIC_USER || password !== process.env.BASIC_PASS) return res.status(401).json({message: 'Invalid authorization header'});
  return next();
}
