import React, { useState } from "react";
import {

Box,
Button,
FormControl,
Grid,
InputLabel,
MenuItem,
Select,
SelectChangeEvent,
TextField,
Typography,
} from "@mui/material";

type TransactionFormValues = {
business: string;
category: string;
amount: number | "";
date: string; // ISO yyyy-mm-dd
description: string;
};

type TransactionsFormProps = {
initialValues?: Partial<TransactionFormValues>;
categories?: string[];
onSubmit?: (values: TransactionFormValues) => void;
onCancel?: () => void;
};

const defaultCategories = ["Income", "Expense"];

export default function TransactionsForm({
initialValues = {},
categories = defaultCategories,
onSubmit,
onCancel,
}: TransactionsFormProps) {
const [values, setValues] = useState<TransactionFormValues>({
    business: initialValues.business ?? "",
    category: initialValues.category ?? "",
    amount: initialValues.amount ?? "",
    date: initialValues.date ?? new Date().toISOString().slice(0, 10),
    description: initialValues.description ?? "",
});

const [errors, setErrors] = useState<Partial<Record<keyof TransactionFormValues, string>>>({});

const handleChange =
    (key: keyof TransactionFormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const raw = (e as any).target.value;
        const value =
            key === "amount" ? (raw === "" ? "" : Number(raw)) : (raw as TransactionFormValues[keyof TransactionFormValues]);
        setValues((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

const validate = (): boolean => {
    const next: typeof errors = {};
    if (!values.business?.trim()) next.business = "Business is required";
    if (!values.category) next.category = "Category is required";
    if (values.amount === "" || Number.isNaN(values.amount)) next.amount = "Amount is required";
    else if (Number(values.amount) <= 0) next.amount = "Amount must be greater than 0";
    if (!values.date) next.date = "Date is required";
    // description optional
    setErrors(next);
    return Object.keys(next).length === 0;
};

const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) return;
    onSubmit?.(values);
};

return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: "100%" }}>
        <Typography variant="h6" mb={2}>
            Create transaction
        </Typography>

        <Grid container spacing={2}>

            {/* <Grid item xs={12} sm={6}>
                <FormControl fullWidth required error={!!errors.business}>
                    <InputLabel id="tx-business-label">Business</InputLabel>
                    <Select
                        labelId="tx-business-label"
                        label="Business"
                        value={values.business}
                        onChange={handleChange("business")}
                    >
                        {companies.map((company) => (
                            <MenuItem key={company.id} value={company.name}>
                                {company.name}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.business ? (
                        <Typography color="error" variant="caption" sx={{ ml: 2, mt: 0.5 }}>
                            {errors.business}
                        </Typography>
                    ) : null}
                </FormControl>
            </Grid> */}

            <Grid item xs={12} sm={6}>
                <FormControl fullWidth required error={!!errors.category}>
                    <InputLabel id="tx-category-label">Category</InputLabel>
                    <Select
                        labelId="tx-category-label"
                        label="Category"
                        value={values.category}
                        onChange={handleChange("category")}
                    >
                        {categories.map((c) => (
                            <MenuItem key={c} value={c}>
                                {c}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.category ? (
                        <Typography color="error" variant="caption" sx={{ ml: 2, mt: 0.5 }}>
                            {errors.category}
                        </Typography>
                    ) : null}
                </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
                <TextField
                    label="Amount"
                    type="number"
                    inputProps={{ step: "0.01", min: "0" }}
                    value={values.amount}
                    onChange={handleChange("amount")}
                    fullWidth
                    required
                    error={!!errors.amount}
                    helperText={errors.amount}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <TextField
                    label="Date"
                    type="date"
                    value={values.date}
                    onChange={handleChange("date")}
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.date}
                    helperText={errors.date}
                />
            </Grid>

            <Grid item xs={12} sm={4}>
                <TextField
                    label="Description"
                    value={values.description}
                    onChange={handleChange("description")}
                    fullWidth
                    placeholder="Optional"
                    multiline
                    minRows={1}
                    maxRows={4}
                />
            </Grid>

            <Grid item xs={12} display="flex" gap={1} justifyContent="flex-end">
                <Button variant="outlined" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" variant="contained" onClick={handleSubmit}>
                    Save
                </Button>
            </Grid>
        </Grid>
    </Box>
);
}