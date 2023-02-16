import React from 'react';
import Sidebar from './Sidebar';

// interface AdminLayoutProps {
//     children: React.ReactNode;
// }

function AdminGeneral() {
    return (
        <div className="admin-layout">
           
            <div className="admin-content">
                {/* {children} */}
                <h1>This is admin general/settings page</h1>
            </div>
        </div>
    );
}

export default AdminGeneral;
