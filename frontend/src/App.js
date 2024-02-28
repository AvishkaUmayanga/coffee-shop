import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import OrderPage from "./pages/OrderPage";
import AdminDashBoard from "./pages/admin/AdminDashBoard";
import UpdateCoffee from "./pages/admin/UpdateCoffee";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/order/:id" element={<OrderPage />} />
          <Route path="/dashboard" element={<AdminDashBoard />} />
          <Route path="/update_coffee/:id" element={<UpdateCoffee />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
