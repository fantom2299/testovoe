import React, { useState } from "react";
import { AppBar, Toolbar, TextField, Button, Box, Container } from '@mui/material';

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  }

  


  return (
    <AppBar style={{ backgroundColor: '#00838F' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box display="flex" width={912} >
            <TextField 
              label="Поисковой запрос" 
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              fullWidth 
              style={{ marginRight: '8px', backgroundColor: '#fff', borderRadius: '8px', height: '42px'}}
              InputLabelProps={{
                style: { top: '-5px'}
              }} 
            />
            <Button 
              variant="contained" 
              style={{ backgroundColor: '#2196f3', color: '#fff', width: '102', height: '42px' }}
              onClick={handleSearch} 
            >
              ИСКАТЬ
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header;
