import axios from 'axios';
import { GitHubResponse, GitHubVariables } from '@/types/github';

const GITHUB_API_URL = 'https://api.github.com/graphql';

export async function fetchGitHubData<T>(
  query: string,
  variables: GitHubVariables
): Promise<GitHubResponse<T>> {
  const response = await axios.post(
    GITHUB_API_URL,
    {
      query,
      variables,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    }
  );

  return response.data;
} 