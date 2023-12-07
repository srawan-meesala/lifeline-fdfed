import React from 'react';
import Dashboard from '../components/AdminDashboard';
// import Hospitals from '../components/Hospitals';

function Admin() {
  // State to track the active view (dashboard or hospitals list)
  const [activeView, setActiveView] = React.useState('dashboard');

  return (
    <div className="Admin-whole">
     <Dashboard />
    </div>
  );
}

export default Admin;