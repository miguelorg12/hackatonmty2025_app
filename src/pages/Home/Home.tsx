import { Container, Grid, Box } from '@mui/material';
import MetricCard from '@/components/Dashboard/MetricCard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import DashboardHeader from '@/components/Auth/DashboardHeader';
import CashFlowChart from '@/components/Dashboard/CashaFlowChart';
import IncomePieChart from '@/components/Dashboard/IncomePieChar';
import TransactionsTable from '@/components/Dashboard/TransactionTable';
import FinancialAlerts from '@/components/Dashboard/FinancialAlerts';

const Home = () => {
  return (
    <Box 
      sx={{ 
        bgcolor: 'background.default', 
        minHeight: '100vh',
        pt: 2,
        pb: 6
      }}
    >
      <Container maxWidth="xl">
        <DashboardHeader />

        {/* Métricas Principales */}
        <Grid 
          container 
          spacing={3} 
          sx={{ 
            mb: 4,
            mt: 1,
            '& .MuiPaper-root': {
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: (theme) => theme.shadows[4]
              }
            }
          }}
        >
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Ingresos Totales"
              value="$45,231"
              change={12.5}
              icon={<AttachMoneyIcon sx={{ color: 'success.main' }} fontSize="large" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Egresos Totales"
              value="$32,180"
              change={-5.3}
              icon={<TrendingUpIcon sx={{ color: 'error.main' }} fontSize="large" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Balance Actual"
              value="$13,051"
              change={8.2}
              icon={<AccountBalanceIcon sx={{ color: 'info.main' }} fontSize="large" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard 
              title="ROI Proyectado" 
              value="24.8%" 
              change={3.1} 
              icon={<ShowChartIcon sx={{ color: 'warning.main' }} fontSize="large" />} 
            />
          </Grid>
        </Grid>

        {/* Gráficas */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} lg={8}>
            <CashFlowChart />
          </Grid>
          <Grid item xs={12} lg={4}>
            <IncomePieChart />
          </Grid>
        </Grid>

        {/* Transacciones y Alertas */}
        <Grid container spacing={3}>
          <Grid item xs={12} lg={7}>
            <TransactionsTable />
          </Grid>
          <Grid item xs={12} lg={5}>
            <FinancialAlerts />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;