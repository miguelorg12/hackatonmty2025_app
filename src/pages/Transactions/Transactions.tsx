import { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Container,
  Dialog,
  Typography,
  Fab,
  Zoom,
  useScrollTrigger,
  Slide,
  Stack,
  Pagination,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TransactionsForm from '@/components/Transactions/TransactionsForm';
import TransactionStats from '@/components/Transactions/TransactionsStats';
import TransactionFilters from '@/components/Transactions/TransactionFilters';
import TransactionTable from '@/components/Transactions/TransactionTable';

type Transaction = {
  id: number;
  business: string;
  category: string;
  amount: number;
  date: string;
  description?: string;
};

const mockTransactions: Transaction[] = [
  {
    id: 1,
    business: 'Office Depot',
    category: 'Expense',
    amount: -150.5,
    date: '2025-01-25',
    description: 'Office supplies',
  },
  {
    id: 2,
    business: 'Client XYZ',
    category: 'Income',
    amount: 5000,
    date: '2025-01-24',
    description: 'Monthly service payment',
  },
  {
    id: 3,
    business: 'Amazon',
    category: 'Expense',
    amount: -250,
    date: '2025-01-23',
    description: 'Computer equipment',
  },
  {
    id: 4,
    business: 'Freelance Project',
    category: 'Income',
    amount: 3500,
    date: '2025-01-22',
    description: 'Web development',
  },
  {
    id: 5,
    business: 'Utility Company',
    category: 'Expense',
    amount: -120,
    date: '2025-01-21',
    description: 'Monthly electricity bill',
  },
];

const ITEMS_PER_PAGE = 10;

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Ordenamiento
  const [orderBy, setOrderBy] = useState<string>('date');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  // Paginación
  const [page, setPage] = useState(1);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  // Filtrado de transacciones
  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions];

    // Búsqueda
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.business.toLowerCase().includes(searchLower) ||
          t.description?.toLowerCase().includes(searchLower) ||
          t.category.toLowerCase().includes(searchLower)
      );
    }

    // Filtro por categoría
    if (categoryFilter) {
      filtered = filtered.filter((t) => t.category === categoryFilter);
    }

    // Filtro por fecha
    if (dateFilter) {
      const now = new Date();
      filtered = filtered.filter((t) => {
        const transactionDate = new Date(t.date);
        switch (dateFilter) {
          case 'today':
            return transactionDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return transactionDate >= weekAgo;
          case 'month':
            return (
              transactionDate.getMonth() === now.getMonth() &&
              transactionDate.getFullYear() === now.getFullYear()
            );
          case 'year':
            return transactionDate.getFullYear() === now.getFullYear();
          default:
            return true;
        }
      });
    }

    // Ordenamiento
    filtered.sort((a, b) => {
      let aValue: any = a[orderBy as keyof Transaction];
      let bValue: any = b[orderBy as keyof Transaction];

      if (orderBy === 'date') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [transactions, searchTerm, categoryFilter, dateFilter, orderBy, order]);

  // Paginación
  const paginatedTransactions = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return filteredTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTransactions, page]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  // Estadísticas
  const stats = useMemo(() => {
    const totalIncome = filteredTransactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = Math.abs(
      filteredTransactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + t.amount, 0)
    );
    const balance = totalIncome - totalExpense;

    return {
      totalIncome,
      totalExpense,
      balance,
      transactionCount: filteredTransactions.length,
    };
  }, [filteredTransactions]);

  const categories = useMemo(() => {
    return Array.from(new Set(transactions.map((t) => t.category)));
  }, [transactions]);

  const handleCreate = () => {
    setSelectedTransaction(null);
    setIsFormOpen(true);
  };

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleDelete = (transaction: Transaction) => {
    setTransactionToDelete(transaction);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (transactionToDelete) {
      setTransactions(transactions.filter((t) => t.id !== transactionToDelete.id));
      setDeleteConfirmOpen(false);
      setTransactionToDelete(null);
    }
  };

  const handleSubmit = (values: any) => {
    if (selectedTransaction) {
      setTransactions(
        transactions.map((t) => (t.id === selectedTransaction.id ? { ...values, id: selectedTransaction.id } : t))
      );
    } else {
      setTransactions([...transactions, { ...values, id: Math.max(...transactions.map((t) => t.id), 0) + 1 }]);
    }
    setIsFormOpen(false);
    setSelectedTransaction(null);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setSelectedTransaction(null);
  };

  const handleSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setDateFilter('');
    setPage(1);
  };

  const hasActiveFilters = searchTerm || categoryFilter || dateFilter;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Slide direction="down" in={!trigger} mountOnEnter unmountOnExit>
        <Box mb={4}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
            <Box>
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Transacciones
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gestiona y analiza todas tus transacciones financieras
              </Typography>
            </Box>
            <Button variant="contained" size="large" startIcon={<AddIcon />} onClick={handleCreate}>
              Nueva Transacción
            </Button>
          </Stack>
        </Box>
      </Slide>

      {/* Estadísticas */}
      <TransactionStats
        totalIncome={stats.totalIncome}
        totalExpense={stats.totalExpense}
        balance={stats.balance}
        transactionCount={stats.transactionCount}
      />

      {/* Filtros */}
      <TransactionFilters
        searchTerm={searchTerm}
        categoryFilter={categoryFilter}
        dateFilter={dateFilter}
        onSearchChange={setSearchTerm}
        onCategoryChange={setCategoryFilter}
        onDateChange={setDateFilter}
        onClearFilters={handleClearFilters}
        categories={categories}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Tabla */}
      <TransactionTable
        transactions={paginatedTransactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
        orderBy={orderBy}
        order={order}
        onSort={handleSort}
      />

      {/* Paginación */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination count={totalPages} page={page} onChange={(_, value) => setPage(value)} color="primary" />
        </Box>
      )}

      {/* FAB para agregar transacción */}
      <Zoom in={trigger}>
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
          }}
          onClick={handleCreate}
        >
          <AddIcon />
        </Fab>
      </Zoom>

      {/* Dialogo de formulario */}
      <Dialog open={isFormOpen} onClose={handleCancel} maxWidth="md" fullWidth>
        <Box sx={{ p: 2 }}>
          <TransactionsForm
            initialValues={selectedTransaction || undefined}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </Box>
      </Dialog>

      {/* Dialogo de confirmación de eliminación */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} maxWidth="xs" fullWidth>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Confirmar Eliminación
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            ¿Estás seguro de que deseas eliminar esta transacción? Esta acción no se puede deshacer.
          </Typography>
          <Stack direction="row" gap={1} justifyContent="flex-end">
            <Button variant="outlined" onClick={() => setDeleteConfirmOpen(false)}>
              Cancelar
            </Button>
            <Button variant="contained" color="error" onClick={confirmDelete}>
              Eliminar
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </Container>
  );
}