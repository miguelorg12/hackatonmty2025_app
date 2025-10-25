
import { Box, Grid2 } from '@mui/material';
import RegisterForm from '@/components/Auth/RegisterForm';

const Login = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Grid2 container sx={{ minHeight: '100vh' }}>
        
        <Grid2
          size= {{ xs: 12, md: 6 }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 3, md: 6 },
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 440 }}>
            <RegisterForm />
          </Box>
        </Grid2>
        <Grid2
          size= {{ xs: 0, md: 6 }}
          sx={{
            display: { xs: 'none', md: 'block' },
            backgroundImage: 'url(/public/img/auth/login/cover.png)', 
            backgroundSize: 'fill',
            backgroundPosition: 'center',
          }}
        />
      </Grid2>
    </Box>
  );
};

export default Login;
