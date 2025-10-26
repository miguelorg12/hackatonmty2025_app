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
    <Card 
      elevation={2} 
      sx={{ 
        borderRadius: 2,
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '4px',
          backgroundColor: 'primary.main',
          opacity: 0.7
        }
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography 
              variant="subtitle2" 
              sx={{
                color: 'text.primary',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              {title}
            </Typography>
            <Box sx={{ 
              p: 1, 
              borderRadius: '50%', 
              bgcolor: (theme) => theme.palette.mode === 'light' ? 'grey.100' : 'grey.800'
            }}>
              {icon}
            </Box>
          </Stack>
          <Typography variant="h4" fontWeight="bold" sx={{ my: 1 }}>
            {value}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            {isPositive ? (
              <TrendingUpIcon 
                sx={{ 
                  color: 'success.main', 
                  fontSize: 20,
                  animation: 'pulse 2s infinite'
                }} 
              />
            ) : (
              <TrendingDownIcon 
                sx={{ 
                  color: 'error.main', 
                  fontSize: 20,
                  animation: 'pulse 2s infinite'
                }} 
              />
            )}
            <Typography 
              variant="body2" 
              sx={{ 
                color: isPositive ? 'success.main' : 'error.main',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {isPositive ? '+' : ''}
              {change}%
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'text.secondary',
                fontStyle: 'italic'
              }}
            >
              vs mes anterior
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MetricCard;