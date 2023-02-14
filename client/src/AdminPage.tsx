import React from 'react';

type AdminPageProps = {
  children: React.ReactNode;
};

const AdminPage: React.FC<AdminPageProps> = ({ children }) => {
  return (
    <>
      <header>
        <h1>Admin Dashboard</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>Copyright © 2023</p>
      </footer>
    </>
  );
};

export default AdminPage;