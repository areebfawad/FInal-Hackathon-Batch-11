import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';

const App = () => {
  const role = 'user'; // Change to 'admin' for admin role (this can come from context or API)

  return (
    <Router>
      <Navbar role={role} />
      {role === 'user' ? <UserRoutes /> : <AdminRoutes />}
    </Router>
  );
};

export default App;
