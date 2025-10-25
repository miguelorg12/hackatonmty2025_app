
import { Card, CardContent, Stack, TextField, Typography, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        navigate('/');
    }

  return (
    <Card elevation={6} sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Stack spacing={2}>
          <Typography variant="h5" textAlign="center">
            Iniciar Sesión
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Por favor ingresa tus credenciales
          </Typography>

          <TextField label="Correo Electrónico" type="email" fullWidth />
          <TextField label="Contraseña" type="password" fullWidth />

          <Button variant="contained" color="primary" fullWidth sx={{ mt: 1 }} onClick={handleSubmit}>
            Entrar
          </Button>

          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
            <Link underline="hover" component="button" variant="body2">
              ¿Olvidaste tu contraseña?
            </Link>
            <Typography variant="body2" color="text.secondary">
              ¿No tienes cuenta?
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default LoginForm;