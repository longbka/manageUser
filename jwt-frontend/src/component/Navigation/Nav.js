import "./Nav.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
function Nav(props) {
  const { user } = useContext(UserContext);
  const location = useLocation();
  if ((user && user.isAuthenticated === true) || location.pathname === "/") {
    return (
      <div className="topnav">
        <NavLink to="/" exact>
          Home
        </NavLink>
        <NavLink to="/user">User</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
    );
  } else {
    return <></>;
  }
}

export default Nav;
