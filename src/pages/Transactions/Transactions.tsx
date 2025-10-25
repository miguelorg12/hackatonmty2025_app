import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TransactionsForm from "@/components/Transactions/TransactionsForm";

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
    business: "Office Depot",
    category: "Office",
    amount: 150.50,
    date: "2025-10-25",
    description: "Office supplies",
  },
  {
    id: 2,
    business: "Client XYZ",
    category: "Income",
    amount: 5000,
    date: "2025-10-24",
    description: "Monthly service payment",
  },
];

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);

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
      setTransactions(transactions.filter(t => t.id !== transactionToDelete.id));
      setDeleteConfirmOpen(false);
      setTransactionToDelete(null);
    }
  };

  const handleSubmit = (values: any) => {
    if (selectedTransaction) {
      setTransactions(transactions.map(t => 
        t.id === selectedTransaction.id 
          ? { ...values, id: selectedTransaction.id }
          : t
      ));
    } else {
      setTransactions([
        ...transactions,
        { ...values, id: Math.max(...transactions.map(t => t.id), 0) + 1 }
      ]);
    }
    setIsFormOpen(false);
    setSelectedTransaction(null);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Transactions
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Create and manage your financial transactions
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          New Transaction
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Business</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                <TableCell>{transaction.business}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell align="right">
                  ${transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() => handleEdit(transaction)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(transaction)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create/Edit Form Dialog */}
      <Dialog
        open={isFormOpen}
        onClose={handleCancel}
        maxWidth="md"
        fullWidth
      >
        <Box sx={{ p: 2 }}>
          <TransactionsForm
            initialValues={selectedTransaction || undefined}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </Box>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Confirm Delete
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Are you sure you want to delete this transaction? This action cannot be undone.
          </Typography>
          <Box display="flex" gap={1} justifyContent="flex-end">
            <Button
              variant="outlined"
              onClick={() => setDeleteConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Container>
  );
}
