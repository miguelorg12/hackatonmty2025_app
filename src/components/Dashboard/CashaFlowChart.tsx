import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography, useTheme } from '@mui/material';

const data = [
  { mes: 'Ene', ingresos: 4000, egresos: 2400, utilidad: 1600 },
  { mes: 'Feb', ingresos: 3000, egresos: 1398, utilidad: 1602 },
  { mes: 'Mar', ingresos: 2000, egresos: 2800, utilidad: -800 },
  { mes: 'Abr', ingresos: 2780, egresos: 3908, utilidad: -1128 },
  { mes: 'May', ingresos: 1890, egresos: 4800, utilidad: -2910 },
  { mes: 'Jun', ingresos: 2390, egresos: 3800, utilidad: -1410 },
];

const CashFlowChart = () => {
  const theme = useTheme();

  return (
    <Card elevation={3} sx={{ borderRadius: 3, height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Flujo de Caja (6 meses)
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="ingresos" stroke={theme.palette.success.main} strokeWidth={2} />
            <Line type="monotone" dataKey="egresos" stroke={theme.palette.error.main} strokeWidth={2} />
            <Line type="monotone" dataKey="utilidad" stroke={theme.palette.primary.main} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CashFlowChart;