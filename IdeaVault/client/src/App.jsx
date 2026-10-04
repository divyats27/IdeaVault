import { Routes, Route, Navigate, Link } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddIdea from "./pages/AddIdea.jsx";
import EditIdea from "./pages/EditIdea.jsx";
import ViewIdea from "./pages/ViewIdea.jsx";
import Favorites from "./pages/Favorites.jsx";
import Profile from "./pages/Profile.jsx";

function NotFound() {
  return (
    <div className="page narrow center-text">
      <h1>Page not found</h1>
      <p className="muted">The page you are looking for does not exist.</p>
      <Link to="/dashboard" className="btn btn-primary">
        Go to dashboard
      </Link>
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          {/* Public pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private pages (redirect to Login if not logged in) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard view="home" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ideas"
            element={
              <ProtectedRoute>
                <Dashboard view="ideas" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddIdea />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ideas/:id"
            element={
              <ProtectedRoute>
                <ViewIdea />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ideas/:id/edit"
            element={
              <ProtectedRoute>
                <EditIdea />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
