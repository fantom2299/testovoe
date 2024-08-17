import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient';

const container = document.getElementById('root');

if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  );
} else {
  console.error("Не удалось найти элемент с id 'root'");
}
