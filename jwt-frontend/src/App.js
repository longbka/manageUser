import Nav from "./component/Navigation/Nav";
import { BrowserRouter as Router} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css'
import "./App.scss";
import AppRoutes from "./component/routes/AppRoutes";
import { ToastContainer } from "react-toastify";

import { useState,useEffect } from "react";
import _ from "lodash";
function App() {
  const [account, setAccount] = useState({});
  return (
    <Router>
      <div className="App">
        <header className="app-container">
          <Nav/>
          <AppRoutes/>
        </header>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
