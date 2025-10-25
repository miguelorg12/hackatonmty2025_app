import { Container } from "@mui/material";
import Navbar from "./navbar";

const Layout = ({ children } : { children: React.ReactNode }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Navbar />
        {children}
    </Container>
  );
};

export default Layout;
