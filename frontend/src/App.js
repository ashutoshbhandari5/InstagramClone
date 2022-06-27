import LoginPage from "./pages/loginPage";
import Homepage from "./pages/Homepage";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/Common/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Homepage />} />
      </Route>
    </Routes>
  );
}

export default App;
