import { ComponentType } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router";
import { useAppSelector } from "../Store/hook";
import { toast } from "react-toastify";


interface Props extends RouteProps {
  component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
  roles?: string[];
}

export default function PrivateRoute({ component: Component, roles, ...rest }: Props) {
  const { user } = useAppSelector(state => state.account);
  return (
    <Route {...rest} render={props => {
      // console.log(user.roles);
      if (!user) {
        return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      }

 

      return <Component {...props} />
    }}
    />
  );
}