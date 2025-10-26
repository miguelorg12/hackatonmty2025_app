
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography, useTheme } from '@mui/material';

const data = [
  { name: 'Ventas Directas', value: 4000 },
  { name: 'Servicios', value: 3000 },
  { name: 'Productos', value: 2000 },
  { name: 'Otros Ingresos', value: 1500 },
];

const COLORS = ['#0B3D91', '#1565C0', '#6A1B9A', '#FF8F00'];

const IncomePieChart = () => {
  const theme = useTheme();

  return (
    <Card elevation={3} sx={{ borderRadius: 3, height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Distribución de Ingresos
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill={theme.palette.primary.main}
              dataKey="value"
              label={(entry) => `${entry.name}: ${((entry.percent || 0) * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default IncomePieChart;