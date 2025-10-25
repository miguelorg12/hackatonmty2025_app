import { Routes, Route } from 'react-router-dom';
import Register from '@/pages/Auth/Register';
import Login from '@/pages/Auth/Login';
import Home from '@/pages/Home/Home';
import Transactions from '@/pages/Transactions/Transactions';
import Categories from '@/pages/Categories/Categories';
import Layout from '@/components/layout/layaout';

const Routing = () => {
  const isAuthenticated = true; 
  return (
    <Routes>
      
      {isAuthenticated ? (
        <>
          <Route path="*" element={<Layout><Home /></Layout>} />
          <Route path="/transactions" element={<Layout><Transactions /></Layout>} />
          <Route path="/categories" element={<Layout><Categories /></Layout>} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      )}
    </Routes>
  );
};

export default Routing;
