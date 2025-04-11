export interface Contribution {
  date: string;
  commitCount: number;
  additions: number;
  deletions: number;
}

export interface GitHubEvent {
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

export interface GitHubVariables {
  username: string;
  limit: number;
  historyLimit: number;
}

export interface GitHubCommit {
  committedDate: string;
  message: string;
  additions: number;
  deletions: number;
}

export interface RepositoryNode {
  name: string;
  defaultBranchRef: {
    target: {
      history: {
        nodes: GitHubCommit[];
      };
    };
  };
}

export interface GitHubData {
  user: {
    repositories: {
      nodes: RepositoryNode[];
    };
  };
}

export interface GitHubResponse<T> {
  data: T;
  errors?: Array<{
    message: string;
    locations: Array<{
      line: number;
      column: number;
    }>;
  }>;
}