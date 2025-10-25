import React from 'react';
import { Stack, Typography, Select, MenuItem, IconButton, Box, FormControl, InputLabel } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useAppDispatch, useAppSelector } from '@/app/store';
import { changeMode } from '@/features/user/userSlice';

const companies = [
  { id: 1, name: 'Mi Empresa Principal' },
  { id: 2, name: 'Sucursal Norte' },
  { id: 3, name: 'Negocio Secundario' },
  { id: 4, name: 'Startup Tech' },
];

const DashboardHeader = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.user.mode);
  const [selectedCompany, setSelectedCompany] = React.useState(companies[0].id);

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
      <Stack direction="row" alignItems="center" gap={2}>
        <FormControl size="small" sx={{ minWidth: 220 }}>
          <InputLabel>Empresa</InputLabel>
          <Select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value as number)}
            label="Empresa"
          >
            {companies.map((company) => (
              <MenuItem key={company.id} value={company.id}>
                {company.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <IconButton onClick={() => dispatch(changeMode())} sx={{ border: 1, borderColor: 'divider' }}>
          <Brightness4Icon
            sx={{
              transition: 'transform 0.4s',
              transform: mode === 'dark' ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default DashboardHeader;