import LoginPage from "./pages/loginPage";
import Homepage from "./pages/Homepage";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Homepage />} />
      </Route>
    </Routes>
  );
}

export default App;
