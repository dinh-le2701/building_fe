import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login/Login';
import Admin from "./components/admin/Admin";
import User from "./components/user/User";

// Tạo một component ProtectedRoute riêng biệt
function ProtectedRoute({ children, allowedRole }) {
  const role = sessionStorage.getItem('role');
  return role === allowedRole ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute allowedRole="ADMIN">
                <Admin />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
