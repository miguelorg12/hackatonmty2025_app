import React from 'react';
import { Card, CardContent, Typography, Stack, Alert, AlertTitle } from '@mui/material';

const alerts = [
  {
    severity: 'warning' as const,
    title: 'Flujo de caja bajo',
    message: 'Se pronostica déficit en 15 días. Considera reducir gastos operativos.',
  },
  {
    severity: 'info' as const,
    title: 'Oportunidad de inversión',
    message: 'Basado en tu flujo, puedes invertir hasta $5,000 este mes.',
  },
  {
    severity: 'error' as const,
    title: 'Factura vencida',
    message: 'Tienes 2 facturas por cobrar con más de 30 días de retraso.',
  },
];

const FinancialAlerts = () => {
  return (
    <Card elevation={3} sx={{ borderRadius: 3, height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Alertas y Recomendaciones
        </Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          {alerts.map((alert, index) => (
            <Alert key={index} severity={alert.severity}>
              <AlertTitle>{alert.title}</AlertTitle>
              {alert.message}
            </Alert>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FinancialAlerts;