import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Divider,
  Stack,
  MenuItem,
  InputAdornment,
  Button,
  CircularProgress,
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface UserSettings {
  username: string;
  email: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
}

interface BusinessSettings {
  enterpriseName: string;
  businessType: string;
  initialBalance: number;
}

const businessTypes = [
  'Retail',
  'Services',
  'Manufacturing',
  'Technology',
  'Food & Beverage',
  'Healthcare',
  'Education',
  'Other'
];

const SettingsForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [userSettings, setUserSettings] = useState<UserSettings>({
    username: '',
    email: '',
    password: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [businessSettings, setBusinessSettings] = useState<BusinessSettings>({
    enterpriseName: '',
    businessType: '',
    initialBalance: 0
  });

  // Fetch initial settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // TODO: Replace with actual API calls
        // const userResponse = await fetch('/api/user-settings');
        // const businessResponse = await fetch('/api/business-settings');
        // const userData = await userResponse.json();
        // const businessData = await businessResponse.json();
        
        // Simulated data
        setUserSettings({
          username: 'current_user',
          email: 'user@example.com',
          password: '',
          newPassword: '',
          confirmPassword: ''
        });

        setBusinessSettings({
          enterpriseName: 'My Business',
          businessType: 'Technology',
          initialBalance: 10000
        });
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserSettings({
      ...userSettings,
      [e.target.name]: e.target.value
    });
  };

  const handleBusinessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessSettings({
      ...businessSettings,
      [e.target.name]: e.target.value
    });
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Implement API call to update user settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('User settings updated:', userSettings);
    } catch (error) {
      console.error('Error updating user settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBusinessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: Implement API call to update business settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Business settings updated:', businessSettings);
    } catch (error) {
      console.error('Error updating business settings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: 3 }}>
      <Grid container spacing={3}>
        {/* User Settings */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={2}
            sx={{
              height: '100%',
              '&:hover': {
                boxShadow: (theme) => theme.shadows[4]
              }
            }}
          >
            <CardContent>
              <Stack spacing={3}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PersonIcon color="primary" />
                  <Typography variant="h6">User Settings</Typography>
                </Stack>
                <Divider />
                <form onSubmit={handleUserSubmit}>
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      value={userSettings.username}
                      onChange={handleUserChange}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={userSettings.email}
                      onChange={handleUserChange}
                      variant="outlined"
                    />
                    <Typography variant="subtitle2" color="text.secondary">
                      Change Password
                    </Typography>
                    <TextField
                      fullWidth
                      label="Current Password"
                      name="password"
                      type="password"
                      value={userSettings.password}
                      onChange={handleUserChange}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="New Password"
                      name="newPassword"
                      type="password"
                      value={userSettings.newPassword}
                      onChange={handleUserChange}
                      variant="outlined"
                    />
                    <Button
                      disabled={loading}
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={loading && <CircularProgress size={20} color="inherit" />}
                    >
                      Update User Settings
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Business Settings */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={2}
            sx={{
              height: '100%',
              '&:hover': {
                boxShadow: (theme) => theme.shadows[4]
              }
            }}
          >
            <CardContent>
              <Stack spacing={3}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <BusinessIcon color="primary" />
                  <Typography variant="h6">Business Settings</Typography>
                </Stack>
                <Divider />
                <form onSubmit={handleBusinessSubmit}>
                  <Stack spacing={2}>
                    <TextField
                      fullWidth
                      label="Enterprise Name"
                      name="enterpriseName"
                      value={businessSettings.enterpriseName}
                      onChange={handleBusinessChange}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      select
                      label="Business Type"
                      name="businessType"
                      value={businessSettings.businessType}
                      onChange={handleBusinessChange}
                      variant="outlined"
                    >
                      {businessTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      fullWidth
                      label="Initial Balance"
                      name="initialBalance"
                      type="number"
                      value={businessSettings.initialBalance}
                      onChange={handleBusinessChange}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoneyIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button
                      disabled={loading}
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={loading && <CircularProgress size={20} color="inherit" />}
                    >
                      Update Business Settings
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsForm;
