import { ComponentType } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router";
import { useAppSelector } from "../Store/hook";
import { toast } from "react-toastify";
import Sidebar from "../Components/Sidebar/Sidebar";
import "./adminDashboard.css"

interface Props extends RouteProps {
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
}

export default function AdminRoute({ component: Component, ...rest }: Props) {
  const { user } = useAppSelector(state => state.account);
  const isAdmin = user?.role === "Admin";
  
  return (
    <Route {...rest} render={props => {
      if (!user) {
        return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
      }

      if (!isAdmin) {
        toast.error("Access denied: You do not have permission to view this page.");
        return <Redirect to="/" />;
      }

      return (
      <>
        <Sidebar />
        <div className="section2">
        <Component {...props} />

        </div>
      </>
      
      );
    }} />
  );
}

