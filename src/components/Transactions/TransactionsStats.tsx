import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Stack } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptIcon from '@mui/icons-material/Receipt';

interface TransactionStatsProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;
}

const TransactionStats: React.FC<TransactionStatsProps> = ({
  totalIncome,
  totalExpense,
  balance,
  transactionCount,
}) => {
  const stats = [
    {
      label: 'Ingresos Totales',
      value: `$${totalIncome.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`,
      icon: <TrendingUpIcon fontSize="large" />,
      color: 'success.main',
      bgColor: 'success.lighter',
    },
    {
      label: 'Egresos Totales',
      value: `$${totalExpense.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`,
      icon: <TrendingDownIcon fontSize="large" />,
      color: 'error.main',
      bgColor: 'error.lighter',
    },
    {
      label: 'Balance',
      value: `$${balance.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`,
      icon: <AccountBalanceWalletIcon fontSize="large" />,
      color: balance >= 0 ? 'primary.main' : 'error.main',
      bgColor: balance >= 0 ? 'primary.lighter' : 'error.lighter',
    },
    {
      label: 'Total Transacciones',
      value: transactionCount.toString(),
      icon: <ReceiptIcon fontSize="large" />,
      color: 'info.main',
      bgColor: 'info.lighter',
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card elevation={3} sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {stat.label}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold" color={stat.color}>
                    {stat.value}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: stat.bgColor,
                    color: stat.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {stat.icon}
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TransactionStats;