import GitHub from '../src/core/github';

let repos;

describe('Testing GitHub Integration', () => {
  beforeAll(async () => {
    repos = await GitHub.listRepos('samuk-a');
  });

  test('Should return all public repositories', () => {
    expect(repos).toHaveLength(17);
  });

  test('First repo created must be API-Medicos', () => {
    expect(repos[0].name).toBe('API-Medicos');
  });

  test('No user found, should return error', async () => {
    const repos = async () => {
      await GitHub.listRepos('not-found-user-not-exists')
    }
    expect(repos).rejects.toThrow('Not Found');
  })
});
