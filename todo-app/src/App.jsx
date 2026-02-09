import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./index.css";
import Navigation from "./components/Navigation";
import Todo from "./pages/Todo";
import Users from "./pages/Users";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
