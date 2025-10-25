import { Stack, Typography, Box } from '@mui/material';

const DashboardHeader = () => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }} flexWrap="wrap" gap={2}>
      <Box>
        <Typography variant="h4" fontWeight="bold">
          Dashboard Financiero
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Gestión inteligente para tu negocio
        </Typography>
      </Box>
    </Stack>
  );
};

export default DashboardHeader;