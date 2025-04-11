import { NextResponse } from 'next/server';
import { fetchGitHubData } from '@/lib/github';
import { GET_USER_CONTRIBUTIONS } from '@/graphql/queries/getUserContributions';
import { GitHubData, GitHubVariables } from '@/types/github';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    
    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    const variables: GitHubVariables = {
      username,
      limit: 10,
      historyLimit: 100
    };

    const response = await fetchGitHubData<GitHubData>(GET_USER_CONTRIBUTIONS, variables);

    if (response.errors) {
      return NextResponse.json(
        { error: 'GraphQL Error', details: response.errors },
        { status: 400 }
      );
    }

    const data = response.data;
    
    if (!data?.user?.repositories?.nodes) {
      return NextResponse.json(
        { error: 'No data found for user' },
        { status: 404 }
      );
    }

    const contributions: Record<string, { commitCount: number; additions: number; deletions: number }> = {};

    data.user.repositories.nodes.forEach((repo) => {
      if (repo.defaultBranchRef?.target?.history?.nodes) {
        repo.defaultBranchRef.target.history.nodes.forEach((commit) => {
          const date = commit.committedDate.split('T')[0];
          
          if (!contributions[date]) {
            contributions[date] = { commitCount: 0, additions: 0, deletions: 0 };
          }

          contributions[date].commitCount += 1;
          contributions[date].additions += commit.additions;
          contributions[date].deletions += commit.deletions;
        });
      }
    });

    const formattedContributions = Object.entries(contributions)
      .map(([date, { commitCount, additions, deletions }]) => ({
        date,
        commitCount,
        additions,
        deletions,
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json(formattedContributions);
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub contributions' },
      { status: 500 }
    );
  }
} 