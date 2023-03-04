import "./App.css";
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Popup from "./components/Popup";
import ApprovePost from "./pages/ApprovePost";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.userType);

  useEffect(() => {
    if (user && user.userType === 1) {
      setIsAuthenticated(true);
      setIsAdmin(true);
    } else if (user) {
      setIsAuthenticated(true);
      setIsAdmin(false);
    }
  }, []);

  return (
    <Router>
      <Popup />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />

        {isAuthenticated && (
          <Route
            path="/approvepost"
            element={isAdmin ? <ApprovePost /> : <Navigate to="/" />}
          />
        )}

        {/* {isAuthenticated && isAdmin ? (
          <Route exact path="/approvepost" element={<ApprovePost />} />
        ) : (
          history("/login")
        )} */}

        <Route exact path="/" element={<Home />} />

        {!isAuthenticated && <Route path="/" element={<Login />} />}
      </Routes>
    </Router>
  );
}

export default App;
