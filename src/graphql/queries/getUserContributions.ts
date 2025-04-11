export const GET_USER_CONTRIBUTIONS = `
  query GetUserContributions($username: String!, $limit: Int!, $historyLimit: Int!) {
    user(login: $username) {
      repositories(first: $limit, orderBy: {field: UPDATED_AT, direction: DESC}) {
        nodes {
          name
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: $historyLimit, since: "2024-01-01T00:00:00Z") {
                  nodes {
                    committedDate
                    message
                    additions
                    deletions
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`; 