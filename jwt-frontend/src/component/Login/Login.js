/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory } from "react-router-dom";
import "./Login.scss";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../services/userService";
import { UserContext } from "../context/UserContext";
function Login() {
  const { loginContext } = useContext(UserContext);
  let history = useHistory();
 
  const handleCreateNewAccount = () => {
    history.push("/register");
  };
  const [valueLogin, setValueLogin] = useState("");
  const [valuePassword, setValuePassword] = useState("");
  const defaultObjValue = {
    isValidValueLogin: true,
    isValidValuePassword: true,
  };
  const [objValidValue, setObjValidValue] = useState(defaultObjValue);
  const handleLogin = async () => {
    setObjValidValue(defaultObjValue);
    if (valueLogin === "") {
      setObjValidValue({ ...defaultObjValue, isValidValueLogin: false });
      toast.error("Please enter your email or your phone number");
      return;
    }
    if (valuePassword === "") {
      setObjValidValue({ ...defaultObjValue, isValidValuePassword: false });
      toast.error("Please enter your password");
      return;
    }
    let response = await loginUser(valueLogin, valuePassword);
    //success
    if (response && +response.EC === 0) {
      let roleUser = response.DT.roleUser;
      let email = response.DT.email;
      let username = response.DT.username;
      let token = response.DT.accessToken;
      let data = {
        isAuthenticated: true,
        token,
        account: { roleUser, username, email },
      };
      console.log("data",data)
      loginContext(data);
      history.push("/user");
      // window.location.reload();
    }
    //error
    if (response && response && +response.EC !== 0) {
      toast.error(response.EM);
    }
  };
  const handleEnterLogin = (e) => {
    console.log(e);
    if (e.charCode === 13 && e.code === "Enter") {
      handleLogin();
    }
  };
  return (
    <div className="login-container">
      <div className="container">
        <div className="content">
          <div className="row pt-5 px-3">
            <div className="content-left col-12 col-sm-7 d-none d-sm-block ">
              <img
                className="img-brand"
                src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
                alt="Facebook"
              />
              <div className="description">
                Facebook helps you connect and share with the people in your
                life.
              </div>
            </div>
            <div className="content-right col-sm-5 col-12 d-flex flex-column  gap-3 py-3">
              <div className="text-center d-sm-none d-block">
                <img
                  className="img-brand"
                  src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
                  alt="Facebook"
                  width={"200px"}
                />
              </div>
              <input
                value={valueLogin}
                className={
                  objValidValue.isValidValueLogin
                    ? "form-control"
                    : "form-control is-invalid"
                }
                type="text"
                placeholder="Enter email or address"
                onChange={(e) => {
                  setValueLogin(e.target.value);
                }}
              />
              <input
                value={valuePassword}
                className={
                  objValidValue.isValidValuePassword
                    ? "form-control"
                    : " is-invalid form-control"
                }
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setValuePassword(e.target.value);
                }}
                onKeyPress={(e) => {
                  handleEnterLogin(e);
                }}
              />
              <button
                className="btn btn-primary btn-login btn-lg"
                onClick={handleLogin}
              >
                Log in
              </button>
              <a className="forgot-password text-center" href="/login">
                Forgotten password
              </a>
              <hr />
              <div className="text-center">
                <button
                  className="btn btn-success btn-register btn-lg"
                  onClick={() => {
                    handleCreateNewAccount();
                  }}
                >
                  Create New Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
