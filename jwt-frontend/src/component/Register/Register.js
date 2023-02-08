import { useHistory } from "react-router-dom";
import "./Register.scss";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify/dist";
import "react-toastify/dist/ReactToastify.css";
import { registerNewUser } from "../../services/userService";
function Register() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaultCheckInput = {
    isValidEmail: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
    isValidPhoneNumber: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultCheckInput);
  let history = useHistory();
  toast.configure();
  const isValid = () => {
    setObjCheckInput(defaultCheckInput)
    let regexEmail = /\S+@\S+\.\S+/;
    if (!email) {
      setObjCheckInput({ ...defaultCheckInput, isValidEmail: false });
      toast.error("Email is required");
      return false;
    }
    if (!regexEmail.test(email)) {
      setObjCheckInput({ ...defaultCheckInput, isValidEmail: false });
      toast.error("Please enter a valid email");
      return false;
    }
    if (!phoneNumber) {
      setObjCheckInput({...defaultCheckInput,isValidPhoneNumber:false})
      toast.error("Phone number is required");
      return false;
    }
    if (!password) {
      setObjCheckInput({ ...defaultCheckInput, isValidPassword: false });
      toast.error("Password is required");
      return false;
    }
    if (password !== confirmPassword) {
      setObjCheckInput({ ...defaultCheckInput, isValidConfirmPassword: false });
      toast.error("Your password is not the same confirmed password!");
      return false;
    }
    return true;
  };
  const handleRegister = async () => {
    if(isValid()){
      let response = await registerNewUser(email,phoneNumber,username,password)
      console.log(response)
      if(+response.EC===0){
        toast.success(response.EM)
        history.push("/login")
      }

    };
  };
  const handleLogin = () => {
    history.push("/login");
  };
  useEffect(()=>{
    // axios.get("http://localhost:3031/api/v1/api/test-api")
    // .then(data=>{
    //   console.log(">>> check data axios: ",data)
    // })
  })
  return (
    <div className="register-container">
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
                  width="200px"
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={
                    objCheckInput.isValidEmail
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  type="text"
                  placeholder="Enter email or address"
                />
              </div>
              <div className="form-group">
                <label>Phone number</label>
                <input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={
                    objCheckInput.isValidPhoneNumber
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  type="text"
                  placeholder="Phone number ..."
                />
              </div>
              <div className="form-group">
                <label>Username: </label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                  type="text"
                  placeholder="Username ..."
                />
              </div>
              <div className="form-group">
                <label>Password: </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={
                    objCheckInput.isValidPassword
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  type="password"
                  placeholder="Password ..."
                />
              </div>
              <div className="form-group">
                <label>Confirm your password: </label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={
                    objCheckInput.isValidConfirmPassword
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  type="password"
                  placeholder="Confirm your password ..."
                />
              </div>
              <button
                className="btn btn-primary btn-register btn-lg"
                onClick={() => handleRegister()}
              >
                Register
              </button>
              <hr />
              <div className="text-center">
                <button
                  className="btn btn-success btn-register btn-lg"
                  onClick={() => handleLogin()}
                >
                  Already have an account, back to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
