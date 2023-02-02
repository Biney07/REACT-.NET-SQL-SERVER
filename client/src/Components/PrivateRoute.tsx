import { ComponentType } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router";
import { useAppSelector } from "../Store/hook";


interface Props extends RouteProps {
    component: ComponentType<RouteComponentProps<any>> | ComponentType<any>
}

export default function PrivateRoute({ component: Component, ...rest }: Props) {
    const {user} = useAppSelector(state => state.account);
    return (
      <Route
        {...rest}
        render={props =>
          user ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/Login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
  