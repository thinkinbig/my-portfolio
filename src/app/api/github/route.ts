import { NextResponse } from 'next/server';
import { LRUCache } from 'lru-cache';
import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

interface GitHubCommit {
  sha: string;
  author: {
    name: string;
    email: string;
  };
  message: string;
  url: string;
}

interface GitHubEvent {
    id: string;
    type: string;
    actor: {
      id: number;
      login: string;
      display_login: string;
      gravatar_id: string;
      url: string;
      avatar_url: string;
    };
    repo: {
      id: number;
      name: string;
      url: string;
    };
    payload: {
      repository_id: number;
      push_id: number;
      size: number;
      distinct_size: number;
      ref: string;
      head: string;
      before: string;
      commits: GitHubCommit[];
    };
    public: boolean;
    created_at: string;
  }

// 设置缓存
const cache = new LRUCache({
  max: 100,
  ttl: 1000 * 60 * 10, // 10分钟缓存
});

async function fetchAllEvents(username: string, limit: number = 60): Promise<GitHubEvent[]> {
  let page = 1;
  const allEvents: GitHubEvent[] = [];
  let hasMore = true;

  while (hasMore && allEvents.length < limit) {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}/events`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
      params: {
        page,
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch GitHub data');
    }

    const events = response.data;
    allEvents.push(...events);

    if (events.length < 30) {
      hasMore = false;
    } else {
      page++;
    }
  }

  return allEvents.slice(0, 60);
}

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

    // 检查缓存
    const cachedData = cache.get(username);
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    // 获取所有事件
    const data = await fetchAllEvents(username);

    // 处理提交数据
    const contributions: Record<string, { commitCount: number; additions: number; deletions: number }> = {};
    for (const event of data) {
      if (event.type === 'PushEvent') {
        const date = event.created_at.split('T')[0];
        const commitCount = event.payload.commits.length;

        // 使用axios获取提交详细信息
        const commitPromises = event.payload.commits.map(async (commit: GitHubCommit) => {
          const commitResponse = await axios.get(commit.url, {
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
              Accept: 'application/vnd.github.v3+json',
            },
          });

          if (commitResponse.status === 200) {
            const commitData = commitResponse.data;
            return {
              additions: commitData.stats.additions,
              deletions: commitData.stats.deletions,
            };
          }
          return { additions: 0, deletions: 0 };
        });

        const commitResults = await Promise.all(commitPromises);
        const additions = commitResults.reduce((sum, result) => sum + result.additions, 0);
        const deletions = commitResults.reduce((sum, result) => sum + result.deletions, 0);

        if (!contributions[date]) {
          contributions[date] = { commitCount: 0, additions: 0, deletions: 0 };
        }

        contributions[date].commitCount += commitCount;
        contributions[date].additions += additions;
        contributions[date].deletions += deletions;
      }
    }

    // 转换为所需的格式
    const formattedContributions = Object.entries(contributions).map(([date, { commitCount, additions, deletions }]) => ({
      date,
      commitCount,
      additions,
      deletions,
    }));

    // 缓存结果
    cache.set(username, formattedContributions);

    return NextResponse.json(formattedContributions);
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub contributions' },
      { status: 500 }
    );
  }
} 