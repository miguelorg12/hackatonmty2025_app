import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Typography,
  Box,
  Tooltip,
  TableSortLabel,
  alpha,
  useTheme,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

type Transaction = {
  id: number;
  business: string;
  category: string;
  amount: number;
  date: string;
  description?: string;
};

interface TransactionTableProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
  onView?: (transaction: Transaction) => void;
  orderBy: string;
  order: 'asc' | 'desc';
  onSort: (property: string) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onEdit,
  onDelete,
  onView,
  orderBy,
  order,
  onSort,
}) => {
  const theme = useTheme();

  const createSortHandler = (property: string) => () => {
    onSort(property);
  };

  const getCategoryColor = (category: string) => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('income') || lowerCategory.includes('ingreso')) return 'success';
    if (lowerCategory.includes('expense') || lowerCategory.includes('gasto')) return 'error';
    return 'default';
  };

  return (
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        '& .MuiTableCell-root': {
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        },
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.08),
              '& .MuiTableCell-head': {
                fontWeight: 700,
                color: 'text.primary',
              },
            }}
          >
            <TableCell>
              <TableSortLabel
                active={orderBy === 'date'}
                direction={orderBy === 'date' ? order : 'asc'}
                onClick={createSortHandler('date')}
              >
                Fecha
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'business'}
                direction={orderBy === 'business' ? order : 'asc'}
                onClick={createSortHandler('business')}
              >
                Empresa
              </TableSortLabel>
            </TableCell>
            <TableCell>Categoría</TableCell>
            <TableCell align="right">
              <TableSortLabel
                active={orderBy === 'amount'}
                direction={orderBy === 'amount' ? order : 'asc'}
                onClick={createSortHandler('amount')}
              >
                Monto
              </TableSortLabel>
            </TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                <Typography variant="body1" color="text.secondary">
                  No se encontraron transacciones
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                hover
                sx={{
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                    cursor: 'pointer',
                  },
                  transition: 'background-color 0.2s',
                }}
              >
                <TableCell>
                  <Typography variant="body2" fontWeight={500}>
                    {new Date(transaction.date).toLocaleDateString('es-MX', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{transaction.business}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={transaction.category}
                    size="small"
                    color={getCategoryColor(transaction.category)}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    color={transaction.amount >= 0 ? 'success.main' : 'error.main'}
                  >
                    ${Math.abs(transaction.amount).toLocaleString('es-MX', {
                      minimumFractionDigits: 2,
                    })}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      maxWidth: 200,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {transaction.description || '-'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                    {onView && (
                      <Tooltip title="Ver detalles">
                        <IconButton size="small" onClick={() => onView(transaction)} color="info">
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Editar">
                      <IconButton size="small" onClick={() => onEdit(transaction)} color="primary">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton size="small" onClick={() => onDelete(transaction)} color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;