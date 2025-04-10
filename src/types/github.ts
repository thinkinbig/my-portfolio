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

export interface GitHubCommit {
  sha: string;
  author: {
    name: string;
    email: string;
  };
  message: string;
  url: string;
} 