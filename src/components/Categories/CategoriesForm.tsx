import React, { useEffect } from "react";
import {

Box,
Button,
Checkbox,
FormControl,
FormControlLabel,
FormHelperText,
Grid,
InputLabel,
MenuItem,
Select,
TextField,
Typography,
} from "@mui/material";

export type Category = {
id?: number;
business_id?: number | null;
name: string;
type: "income" | "expense";
is_default?: boolean;
created_at?: string | null;
updated_at?: string | null;
};

type CategoriesFormProps = {
initialValues?: Partial<Category>;
businessOptions?: { id: number; name: string }[]; // optional helper to choose business
submitLabel?: string;
onSubmit: (payload: Category) => void;
onCancel?: () => void;
};

export default function CategoriesForm({
initialValues = {},
businessOptions = [],
submitLabel = "Save",
onSubmit,
onCancel,
}: CategoriesFormProps) {
const [name, setName] = React.useState(initialValues.name ?? "");
const [type, setType] = React.useState<Category["type"]>(
    initialValues.type ?? "expense"
);
const [businessId, setBusinessId] = React.useState<number | "">(
    initialValues.business_id ?? ""
);
const [isDefault, setIsDefault] = React.useState<boolean>(
    !!initialValues.is_default
);
const [errors, setErrors] = React.useState<{ name?: string }>({});

useEffect(() => {
    // keep local state in sync if parent supplies different initialValues later
    setName(initialValues.name ?? "");
    setType(initialValues.type ?? "expense");
    setBusinessId(initialValues.business_id ?? "");
    setIsDefault(!!initialValues.is_default);
}, [initialValues]);

const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = "Name is required";
    setErrors(e);
    return Object.keys(e).length === 0;
};

const handleSubmit = (ev?: React.FormEvent) => {
    ev?.preventDefault();
    if (!validate()) return;
    const payload: Category = {
        id: initialValues.id,
        name: name.trim(),
        type,
        business_id: businessId === "" ? undefined : Number(businessId),
        is_default: !!isDefault,
        // Keep timestamps untouched (usually backend sets these)
        created_at: initialValues.created_at ?? null,
        updated_at: initialValues.updated_at ?? null,
    };
    onSubmit(payload);
};

return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
            {initialValues.id ? "Edit Category" : "New Category"}
        </Typography>

        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name}
                    inputProps={{ maxLength: 255 }}
                />
            </Grid>

            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id="category-type-label">Type</InputLabel>
                    <Select
                        labelId="category-type-label"
                        value={type}
                        label="Type"
                        onChange={(e) => setType(e.target.value as Category["type"])}
                    >
                        <MenuItem value="income">Income</MenuItem>
                        <MenuItem value="expense">Expense</MenuItem>
                    </Select>
                    <FormHelperText>Choose whether this is income or expense</FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel id="business-select-label">Business</InputLabel>
                    <Select
                        labelId="business-select-label"
                        value={businessId}
                        label="Business"
                        onChange={(e) =>
                            setBusinessId(e.target.value === "" ? "" : Number(e.target.value))
                        }
                    >
                        <MenuItem value="">(None)</MenuItem>
                        {businessOptions.map((b) => (
                            <MenuItem key={b.id} value={b.id}>
                                {b.name}
                            </MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Associate category with a business (optional)</FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} alignItems="center" display="flex">
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isDefault}
                            onChange={(e) => setIsDefault(e.target.checked)}
                            color="primary"
                        />
                    }
                    label="Is default"
                />
            </Grid>

            {initialValues.created_at || initialValues.updated_at ? (
                <>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Created At"
                            value={initialValues.created_at ?? ""}
                            fullWidth
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Updated At"
                            value={initialValues.updated_at ?? ""}
                            fullWidth
                            InputProps={{ readOnly: true }}
                        />
                    </Grid>
                </>
            ) : null}

            <Grid item xs={12} display="flex" gap={1}>
                <Button type="submit" variant="contained" color="primary">
                    {submitLabel}
                </Button>
                <Button
                    type="button"
                    variant="outlined"
                    color="inherit"
                    onClick={() => {
                        if (onCancel) onCancel();
                    }}
                >
                    Cancel
                </Button>
            </Grid>
        </Grid>
    </Box>
);
}