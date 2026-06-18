import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import App from './App';
import './styles.css';

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL ?? 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
);
