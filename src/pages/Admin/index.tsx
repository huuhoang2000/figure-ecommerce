import React from 'react';
import { Outlet } from 'react-router-dom';

interface IAdminProps {
}

const Admin: React.FunctionComponent<IAdminProps> = () => {
  return (
    <>
      {/* Navbar */}
      <div>Admin</div>

      <Outlet />
    </>
  );
};

export default Admin;
