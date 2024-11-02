import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/login/Login'
import Admin from "./components/admin/Admin";
import User from "./components/user/User";

function ProtectedRoute({ children, allowedRole }) {
  const role = sessionStorage.getItem('role');
  return role === allowedRole ? children : <Navigate to="/" />;
}

function App() {
  // const role = sessionStorage.getItem('role'); // Lấy role từ sessionStorage sau khi đăng nhập

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
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </div>
  );
}

export default App;
