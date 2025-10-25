import React from 'react';
import { Card, CardContent, Typography, Stack, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon }) => {
  const isPositive = change >= 0;

  return (
    <Card elevation={3} sx={{ borderRadius: 3, height: '100%' }}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Box sx={{ color: 'primary.main' }}>{icon}</Box>
          </Stack>
          <Typography variant="h4" fontWeight="bold">
            {value}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            {isPositive ? (
              <TrendingUpIcon sx={{ color: 'success.main', fontSize: 20 }} />
            ) : (
              <TrendingDownIcon sx={{ color: 'error.main', fontSize: 20 }} />
            )}
            <Typography variant="body2" color={isPositive ? 'success.main' : 'error.main'} fontWeight={600}>
              {isPositive ? '+' : ''}
              {change}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              vs mes anterior
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MetricCard;