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
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoriesForm, { Category } from "@/components/Categories/CategoriesForm";

const mockBusinessOptions = [
  { id: 1, name: "Mi Empresa Principal" },
  { id: 2, name: "Sucursal Norte" },
  { id: 3, name: "Negocio Secundario" },
];

const mockCategories: Category[] = [
  {
    id: 1,
    name: "Sales",
    type: "income",
    business_id: 1,
    is_default: true,
    created_at: "2025-10-20T10:00:00Z",
    updated_at: "2025-10-20T10:00:00Z",
  },
  {
    id: 2,
    name: "Office Supplies",
    type: "expense",
    business_id: 1,
    is_default: false,
    created_at: "2025-10-21T15:30:00Z",
    updated_at: "2025-10-21T15:30:00Z",
  },
];

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  const handleCreate = () => {
    setSelectedCategory(null);
    setIsFormOpen(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleDelete = (category: Category) => {
    setCategoryToDelete(category);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (categoryToDelete) {
      setCategories(categories.filter(c => c.id !== categoryToDelete.id));
      setDeleteConfirmOpen(false);
      setCategoryToDelete(null);
    }
  };

  const handleSubmit = (values: Category) => {
    if (selectedCategory?.id) {
      setCategories(categories.map(c => 
        c.id === selectedCategory.id 
          ? { ...values, id: selectedCategory.id }
          : c
      ));
    } else {
      setCategories([
        ...categories,
        { 
          ...values, 
          id: Math.max(...categories.map(c => c.id ?? 0), 0) + 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      ]);
    }
    setIsFormOpen(false);
    setSelectedCategory(null);
  };

  const handleCancel = () => {
    setIsFormOpen(false);
    setSelectedCategory(null);
  };

  const getBusinessName = (businessId: number | null | undefined) => {
    if (!businessId) return "(None)";
    return mockBusinessOptions.find(b => b.id === businessId)?.name ?? "(Unknown)";
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Categories
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your income and expense categories
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          New Category
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Business</TableCell>
              <TableCell align="center">Default</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Chip 
                    label={category.type} 
                    color={category.type === "income" ? "success" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{getBusinessName(category.business_id)}</TableCell>
                <TableCell align="center">
                  {category.is_default ? (
                    <Chip label="Default" size="small" color="primary" />
                  ) : null}
                </TableCell>
                <TableCell>
                  {category.updated_at 
                    ? new Date(category.updated_at).toLocaleDateString()
                    : "Never"}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() => handleEdit(category)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(category)}
                    color="error"
                    disabled={category.is_default}
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
          <CategoriesForm
            initialValues={selectedCategory || undefined}
            businessOptions={mockBusinessOptions}
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
            Are you sure you want to delete this category? This action cannot be undone.
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
};

export default Categories;