/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react";
import { Route,Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";
function PrivateRoutes(props) {
  const { user } = useContext(UserContext);
  if (user && user.isAuthenticated === true) {
    return <Route path={props.path} component={props.component} exact />;
  } else {
    return <Redirect to="/login"></Redirect>;
  }
}

export default PrivateRoutes;
