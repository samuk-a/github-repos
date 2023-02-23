import { Router, Request, Response } from 'express';

import GitHub from './core/github';

const router = Router()

router.get('/search', async (req: Request, res: Response) => {
  const user = req.query.user as string;
  if (!user) return res.status(400).json({message: 'Missing "user" query parameter'});
  try {
    const repos = await GitHub.listRepos(user);
    return res.json({repositories: repos});
  } catch (err: any) {
    return res.status(err.status).json({message: err.response.data.message});
  }
});

export default router;
