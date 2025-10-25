import React from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Stack,
  IconButton,
  Tooltip,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';

interface TransactionFiltersProps {
  searchTerm: string;
  categoryFilter: string;
  dateFilter: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onClearFilters: () => void;
  categories: string[];
  hasActiveFilters: boolean;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  searchTerm,
  categoryFilter,
  dateFilter,
  onSearchChange,
  onCategoryChange,
  onDateChange,
  onClearFilters,
  categories,
  hasActiveFilters,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ mb: 3 }}>
      <Stack
        direction={isMobile ? 'column' : 'row'}
        spacing={2}
        alignItems={isMobile ? 'stretch' : 'center'}
      >
        <TextField
          placeholder="Buscar transacciones..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          size="small"
          sx={{ flex: 1, minWidth: isMobile ? '100%' : 300 }}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />

        <TextField
          select
          label="Categoría"
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
          size="small"
          sx={{ minWidth: isMobile ? '100%' : 200 }}
        >
          <MenuItem value="">Todas las categorías</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Período"
          value={dateFilter}
          onChange={(e) => onDateChange(e.target.value)}
          size="small"
          sx={{ minWidth: isMobile ? '100%' : 180 }}
        >
          <MenuItem value="">Todos los períodos</MenuItem>
          <MenuItem value="today">Hoy</MenuItem>
          <MenuItem value="week">Esta semana</MenuItem>
          <MenuItem value="month">Este mes</MenuItem>
          <MenuItem value="year">Este año</MenuItem>
        </TextField>

        {hasActiveFilters && (
          <Tooltip title="Limpiar filtros">
            <IconButton onClick={onClearFilters} color="primary">
              <ClearIcon />
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title="Filtros avanzados">
          <IconButton color="primary">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      {hasActiveFilters && (
        <Stack direction="row" spacing={1} sx={{ mt: 2 }} flexWrap="wrap">
          {searchTerm && (
            <Chip
              label={`Búsqueda: ${searchTerm}`}
              onDelete={() => onSearchChange('')}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
          {categoryFilter && (
            <Chip
              label={`Categoría: ${categoryFilter}`}
              onDelete={() => onCategoryChange('')}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
          {dateFilter && (
            <Chip
              label={`Período: ${dateFilter}`}
              onDelete={() => onDateChange('')}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
        </Stack>
      )}
    </Box>
  );
};

export default TransactionFilters;