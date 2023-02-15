import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Import the admin layout component
import AdminLayout from './AdminLayout';

interface AdminRouteProps {
    component: React.FC<any>;
    path: string;
}

// Define the admin panel route
const AdminRoute = ({ component: Component, ...rest }: AdminRouteProps) => (
    <Route
        {...rest}
        render={(props) =>
            // Check if the user is an admin
            localStorage.getItem('role') === 'Admin' ? (
                // If the user is an admin, load the admin layout component
                <AdminLayout>
                    <Component {...props} />
                </AdminLayout>
            ) : (
                // If the user is not an admin, redirect them to the home page
                <Redirect to="/" />
            )
        }
    />
);

export default AdminRoute;
