import GitHub from '../src/core/github';

let repos;

describe('Testing GitHub Integration', () => {
  beforeAll(async () => {
    repos = await GitHub.listRepos('samuk-a');
  });

  test('Should return all public repositories', () => {
    expect(repos).toHaveLength(30);
  });

  test('First repo created must be mentions-api', () => {
    expect(repos[0].name).toBe('mentions-api');
  });

  test('No user found, should return error', async () => {
    const repos = async () => {
      await GitHub.listRepos('not-found-user-not-exists')
    }
    expect(repos).rejects.toThrow('Not Found');
  })
});
