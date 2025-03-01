import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </Router>
  );
}

export default App;
