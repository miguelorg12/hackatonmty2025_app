import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useAppDispatch, useAppSelector } from '@/app/store';
import { changeMode } from '@/features/user/userSlice';

const NAV_LINKS = [
    { label: "Inicio", href: "Home" },
    { label: "Transacciones", href: "transactions" },
    { label: "Categorias", href: "categories" },
    { label: "Calculadora", href: "calculator" },
    { label: "Configuracion", href: "settings" },
];

const applyTheme = (theme: "light" | "dark") => {
    try {
        document.documentElement.setAttribute("data-theme", theme);
    } catch {}
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
};

const readSavedTheme = (): "light" | "dark" => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") return "dark";
    if (saved === "light") return "light";
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
        return "dark";
    return "light";
};

const Navbar: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [selectedCompany, setSelectedCompany] = useState<number>(1);

    const muiTheme = useMuiTheme();
    const isMdUp = useMediaQuery(muiTheme.breakpoints.up("md"));
    const dispatch = useAppDispatch();
    const mode = useAppSelector((state) => state.user.mode);

    const companies = [
        { id: 1, name: 'Mi Empresa Principal' },
        { id: 2, name: 'Sucursal Norte' },
        { id: 3, name: 'Negocio Secundario' },
        { id: 4, name: 'Startup Tech' },
    ];

    useEffect(() => {
        const t = readSavedTheme();
        setTheme(t);
        applyTheme(t);
        if (mode !== t) {
            dispatch(changeMode());
        }
    }, []);

    const toggleTheme = () => {
        const next = theme === "light" ? "dark" : "light";
        setTheme(next);
        applyTheme(next);
        dispatch(changeMode());
    };

    return (
        <>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Box
                            component="span"
                            sx={{
                                width: 36,
                                height: 36,
                                borderRadius: 1,
                                bgcolor: "text.primary",
                                display: "inline-block",
                            }}
                            aria-hidden
                        />
                        <Typography variant="h6" component="a" href="#" sx={{ textDecoration: "none", color: "text.primary", fontWeight: 600 }}>
                            Template
                        </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    {isMdUp ? (
                        <Box display="flex" alignItems="center" gap={2}>
                            {NAV_LINKS.map((l) => (
                                <Button key={l.label} href={l.href} color="inherit" size="small">
                                    {l.label}
                                </Button>
                            ))}

                            <FormControl size="small" sx={{ minWidth: 220 }}>
                                <InputLabel>Empresa</InputLabel>
                                <Select
                                    value={selectedCompany}
                                    onChange={(e) => setSelectedCompany(e.target.value as number)}
                                    label="Empresa"
                                >
                                    {companies.map((c) => (
                                        <MenuItem key={c.id} value={c.id}>
                                            {c.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <IconButton onClick={toggleTheme} aria-label="Toggle theme" size="large" sx={{ ml: 1 }}>
                                {theme === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
                            </IconButton>
                        </Box>
                    ) : (
                        <Box display="flex" alignItems="center">
                            <FormControl size="small" sx={{ minWidth: 160, mr: 1 }}>
                                <InputLabel>Empresa</InputLabel>
                                <Select
                                    value={selectedCompany}
                                    onChange={(e) => setSelectedCompany(e.target.value as number)}
                                    label="Empresa"
                                >
                                    {companies.map((c) => (
                                        <MenuItem key={c.id} value={c.id}>
                                            {c.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <IconButton onClick={toggleTheme} aria-label="Toggle theme" size="large">
                                {theme === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
                            </IconButton>

                            <IconButton
                                edge="end"
                                onClick={() => setMobileOpen(true)}
                                aria-label="Open menu"
                                size="large"
                                sx={{ ml: 1 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
                <Box sx={{ width: 260 }} role="presentation" onClick={() => setMobileOpen(false)}>
                    <List>
                        {NAV_LINKS.map((l) => (
                            <ListItem key={l.label} disablePadding>
                                <ListItemButton component="a" href={l.href}>
                                    <ListItemText primary={l.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Navbar;
