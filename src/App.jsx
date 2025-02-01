import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import Footer from './components/Footer';

const App = () => {
  const role = 'user';

  return (
    <Router>
      <Navbar role={role} />
      {role === 'user' ? <UserRoutes /> : <AdminRoutes />}
      
      <Footer/>
    </Router>
  );
};

export default App;
