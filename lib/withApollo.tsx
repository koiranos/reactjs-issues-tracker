import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  DefaultOptions,
  HttpLink,
  InMemoryCache,
  concat,
} from "@apollo/client";
import { useRouter } from "next/navigation";
import nextWithApollo from "next-with-apollo";

const withApollo = nextWithApollo(
  ({ initialState, headers }) => {
    const httpLink = new HttpLink({ uri: "https://api.github.com/graphql" });

    const authMiddleware = new ApolloLink((operation, forward) => {
      // add the authorization to the headers
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          authorization: "Bearer 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",
        },
      }));

      return forward(operation);
    });

    return new ApolloClient({
      ssrMode: typeof window === "undefined",

      link: concat(authMiddleware, httpLink),
      cache: new InMemoryCache().restore(initialState || {}),
    });
  },
  {
    render: ({ Page, props }) => {
      const router = useRouter();
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} {...router} />
        </ApolloProvider>
      );
    },
  }
);

export default withApollo;
