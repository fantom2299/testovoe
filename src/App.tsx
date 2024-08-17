import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Header from './components/Header/Header'
import RepoList from './components/RepoList';
import { Container, Typography } from '@mui/material';

// GraphQL-запрос для поиска репозиториев
const GET_REPOSITORIES = gql`
  query SearchRepositories($query: String!, $first: Int = 10, $after: String) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after) {
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        ... on Repository {
          id
          name
          primaryLanguage {
            name
          }
          forks {
            totalCount
          }
          stargazers {
            totalCount
          }
          updatedAt
          url
          description
          repositoryTopics(first: 10) {
            nodes {
              topic {
                name
              }
            }
          }
        }
      }
    }
  }
`;

const App: React.FC = () => {
  // Состояние для хранения текущего поискового запроса
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  // Состояние для хранения количества запрашиваемых элементов
  const [first] = useState(10);
  // Состояние для хранения курсора следующей страницы
  const [after, setAfter] = useState<string | null>(null);

  // Вызов GraphQL-запроса с использованием Apollo Client
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    variables: { query: searchTerm, first, after },
    skip: !searchTerm, // Запрос выполняется только если есть поисковый запрос
  });

  // Функция для обновления поискового запроса и сброса пагинации
  const handleSearch = (query: string) => {
    setSearchTerm(query);
    setAfter(null); // Сбрасываем пагинацию при новом поиске
  };

  

  return (
    <Container>
      {/* Заголовок страницы */}
      <Typography variant="h4" align="center" marginY={4}>
        
      </Typography>
      {/* Компонент поиска */}
      <Header onSearch={handleSearch} />
      {/* Отображение статуса загрузки или ошибки */}
      {loading && <Typography align="center">Loading...</Typography>}
      {error && <Typography align="center" color="error">Error: {error.message}</Typography>}
      {/* Компонент списка репозиториев */}
      {data && (
        <RepoList
          repositories={data.search.nodes}
        />
      )}
    </Container>
  );
};

export default App;