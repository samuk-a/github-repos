import { Router, Request, Response } from 'express';

import auth from './middlewares/auth';
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

router.post('/migrate', auth, async (req: Request, res: Response) => {
  const user = req.query.user as string;
  if (!user) return res.status(400).json({message: 'Missing "user" query parameter'});
  try {
    const repos = await GitHub.listRepos(user);
    await Promise.all(repos.map(async repo => {
      const { id, name, url, description, language } = repo;
      await GitHub.saveRepo({
        id,
        name,
        githubUrl: url,
        description,
        language
      });
    }));
    return res.json({message: 'Repositories migrated successfully'});
  } catch (err: any) {
    console.log(err)
    return res.status(err.status).json({message: err.response.data.message});
  }
});

export default router;
