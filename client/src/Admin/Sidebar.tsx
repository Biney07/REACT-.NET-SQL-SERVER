import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="admin-sidebar">
      <ul>
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/users">Users</Link>
        </li>
        <li>
          <Link to="/admin/products">Products</Link>
        </li>
        <li>
          <Link to="/admin/orders">Orders</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
