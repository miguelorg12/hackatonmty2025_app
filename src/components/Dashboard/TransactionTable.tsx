import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Box,
} from '@mui/material';

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: 'Ingreso' | 'Egreso';
}

const transactions: Transaction[] = [
  { id: 1, date: '2024-07-28', description: 'Pago de cliente A', amount: 2500, type: 'Ingreso' },
  { id: 2, date: '2024-07-27', description: 'Compra de inventario', amount: -1500, type: 'Egreso' },
  { id: 3, date: '2024-07-26', description: 'Servicio de consultoría', amount: 1200, type: 'Ingreso' },
  { id: 4, date: '2024-07-25', description: 'Pago de nómina', amount: -5000, type: 'Egreso' },
  { id: 5, date: '2024-07-24', description: 'Venta de producto B', amount: 800, type: 'Ingreso' },
];

const TransactionsTable = () => {
  return (
    <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 3 }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Transacciones Recientes</Typography>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell align="right">Monto</TableCell>
            <TableCell align="center">Tipo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                ${row.amount.toLocaleString()}
              </TableCell>
              <TableCell align="center">
                <Chip label={row.type} color={row.type === 'Ingreso' ? 'success' : 'error'} size="small" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsTable;