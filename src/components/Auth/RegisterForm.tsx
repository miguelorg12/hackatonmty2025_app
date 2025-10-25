import { Button, Card, CardContent, Link, Stack, TextField, Typography } from "@mui/material";

const RegisterForm = () => {
  return (
    <Card elevation={6} sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Stack spacing={2}>
          <Typography variant="h5" textAlign="center">
            Crear Cuenta
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            Por favor completa el siguiente formulario
          </Typography>

          <TextField label="Nombre Empresa" type="text" fullWidth />
          <TextField label="Nombre Usuario" type="text" fullWidth />
          <TextField label="Correo Electrónico" type="email" fullWidth />
          <TextField label="Contraseña" type="password" fullWidth />


          <Button variant="contained" color="primary" fullWidth sx={{ mt: 1 }}>
            Registrarse
          </Button>

          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1 }}>
            <Link underline="hover" component="button" variant="body2">
              ¿Olvidaste tu contraseña?
            </Link>
            <Typography variant="body2" color="text.secondary">
              ¿Ya tienes cuenta?
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;