import React from 'react';
import Sidebar from './Sidebar';

interface AdminLayoutProps {
    children: React.ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="admin-layout">
            <Sidebar />
            <div className="admin-content">
                {children}
            </div>
        </div>
    );
}

export default AdminLayout;
