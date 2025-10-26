import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import SettingsForm from '@/components/Settings/SettingsForm';

const Settings = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 3, 
            borderRadius: 2,
            bgcolor: 'background.paper'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Settings
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Manage your user profile and business settings
          </Typography>
        </Paper>
        <SettingsForm />
      </Container>
    </Box>
  );
};

export default Settings;