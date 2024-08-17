import React, { useState } from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody, Box, Grid, Typography, Paper, Chip
} from '@mui/material';

interface RepoListProps {
  repositories: any[];
  
}

const RepoList: React.FC<RepoListProps> = ({ repositories }) => {
  
  const [selectedRepo, setSelectedRepo] = useState<any | null>(null);

  return (
    <Grid container spacing={2} style={{ position: 'relative', top: '60px'}}>
      {/* Секция с таблицей списка репозиториев */}
      <Grid item xs={6}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название репозитория</TableCell>
              <TableCell>Язык</TableCell>
              <TableCell>Число форков</TableCell>
              <TableCell>Число звезд</TableCell>
              <TableCell>Дата обновления</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repositories.map((repo) => (
              <TableRow
                key={repo.id}
                hover
                selected={selectedRepo?.id === repo.id}
                onClick={() => setSelectedRepo(repo)}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{repo.name}</TableCell>
                <TableCell>{repo.primaryLanguage?.name || "N/A"}</TableCell>
                <TableCell>{repo.forks.totalCount}</TableCell>
                <TableCell>{repo.stargazers.totalCount}</TableCell>
                <TableCell>{new Date(repo.updatedAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      
      </Grid>

      {/* Секция с топиками выбранного репозитория */}
      <Grid item xs={6}>
        {selectedRepo ? (
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h5" gutterBottom>{selectedRepo.name}</Typography>
            <Typography 
              variant="body1" 
              color="textSecondary" 
              style={{ marginTop: '16px', marginBottom: '16px' }}
            >
              {selectedRepo.primaryLanguage?.name || "N/A"}
            </Typography>
            <Typography 
              variant="body1" 
              color="textSecondary" 
              style={{ position: 'absolute', top: '80px', left: '1040px' }}
            >
              ⭐ {selectedRepo.stargazers.totalCount}
            </Typography>
            {selectedRepo.repositoryTopics.nodes.length > 0 ? (
              <Box>
                {selectedRepo.repositoryTopics.nodes.map((topic: any) => (
                  <Chip
                    key={topic.topic.name}
                    label={topic.topic.name}
                    style={{ marginRight: '8px', marginBottom: '8px' }}
                  />
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary">
                No topics available.
              </Typography>
              
            )}
          </Paper>
        ) : (
          <Typography variant="h6" color="textSecondary">
            Выберите репозиторий
          </Typography>
          
        )}
      </Grid>
    </Grid>
  );
};

export default RepoList;
