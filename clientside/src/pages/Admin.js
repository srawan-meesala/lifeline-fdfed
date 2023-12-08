import React from 'react';
import AdminDashboard from '../components/AdminDashboard';

function Admin() {
  const [activeView, setActiveView] = React.useState('dashboard');

  return (
    <div className="Admin-whole">
     <AdminDashboard />
    </div>
  );
}

export default Admin;