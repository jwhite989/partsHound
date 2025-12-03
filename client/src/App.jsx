import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PartsInventoryPage from "./pages/PartsInventoryPage";
import AddPartPage from "./pages/AddPartPage";
import EditPartPage from "./pages/EditPartPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inventory"
            element={
              <ProtectedRoute>
                <PartsInventoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-part"
            element={
              <ProtectedRoute>
                <AddPartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-part/:id"
            element={
              <ProtectedRoute>
                <EditPartPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
