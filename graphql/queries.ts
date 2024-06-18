import gql from "graphql-tag";

export const GET_ISSUES = gql`
  query GET_ISSUES {
    search(query: "repo:reactjs/react.dev is:issue", type: ISSUE, first: 100) {
      issueCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          ... on Issue {
            title
            url
            createdAt
            number
            state
          }
        }
      }
    }
  }
`;

export const GET_ISSUES_AFTER = gql`
  query GET_ISSUES_AFTER($after: String!) {
    search(
      query: "repo:reactjs/react.dev is:issue"
      type: ISSUE
      first: 100
      after: $after
    ) {
      issueCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          ... on Issue {
            title
            url
            createdAt
            number
            state
          }
        }
      }
    }
  }
`;
