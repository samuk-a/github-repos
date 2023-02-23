import { Octokit } from "@octokit/rest";

import { Repository } from "../schemas/repository";

class GitHub {
  private octokit = new Octokit({
    auth: process.env.GITHUB_AUTH
  });

  public async listRepos(username: string): Promise<Repository[]> {
    const repos = (await this.octokit.rest.repos.listForUser({ username, sort: 'created', direction: 'asc' })).data;
    return repos.filter(repo => repo.description !== null).map(repo => {
      const repository: Repository = {
        id: repo.id,
        name: repo.name,
        url: repo.html_url,
        description: repo.description!,
        language: repo.language
      };
      return repository;
    });
  }
}

export default new GitHub();
