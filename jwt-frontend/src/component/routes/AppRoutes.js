import User from "../../component/MangeUsers/User";
import Register from "../../component/Register/Register";
import Login from "../../component/Login/Login.js";
import { Switch, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Home from "../Home/Home";
import Projects from "../Projects/Projects";
function AppRoutes() {
  return (
    <>
      <Switch>
        <PrivateRoutes path="/projects" component={Projects}/>
        <PrivateRoutes path="/user" component={User} />
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
            <Login/>
        </Route>
        <Route path="/" component={Home}/>
        <Route path="*">404 NOT FOUND</Route>
      </Switch>
    </>
  );
}

export default AppRoutes;
