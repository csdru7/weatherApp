import Header from "./components/Header"
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Login } from "./components/Login";
import Register from "./components/Reg";

import PrivateRoute from "./components/privateRoute";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Home from "./components/Home";
import TokenExpirationCheck from "./utils/TokenExpirationCheck";
import { Delete } from "./components/Weather/DeleteWeather";
import { UserList } from "./components/Admin/UserList";
import { WeatherForm } from "./components/Weather/WeatherForm";
import AddUser from "./components/Admin/AddUser";
import Edituser from "./components/Admin/EditUser";
import { WeatherDisplay } from "./components/Weather/WeatherDisplay";
import Reset from "./components/Reset";
import About from "./components/About";
import Contact from "./components/Contact";
import RoleBasedRoute from "./utils/RoleBasedRoute";

function App() {
  const location = useLocation()
  const showHeader = !['/login', '/register'].includes(location.pathname);
  return (
    <div>
      {showHeader && <Header />}
      <div className="container-fluid" style={{
        background: "linear-gradient(135deg, hsl(192, 15%, 80%), hsl(200, 20%, 90%))",
        width: '100vw',
        minHeight: '100vh',
        padding: '2rem',
        boxSizing: 'border-box',
      }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-user" element={<AddUser />} />
          <Route path="/edit-user" element={<Edituser />} />
          <Route path="/reset-user" element={<Reset />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />

          <Route path="/admin-dashboard" element={<RoleBasedRoute element={  <AdminDashboard />} allowedRoles={['admin']} /> }>
            <Route path="add" element={<WeatherForm />} />
            <Route path="update" element={<WeatherForm />} />
            <Route path="delete" element={<Delete />} />
            <Route path="userList" element={<UserList />} />
            <Route path="weatherInfo" element={<Home />} />
            <Route path="weatherList" element={<WeatherDisplay />} />
          </Route>
        </Routes>
        <TokenExpirationCheck />
      </div>
    </div>
  );
}
const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
export default AppWrapper 