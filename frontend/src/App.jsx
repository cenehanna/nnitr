import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import NewsPage from "./NewsPage";
import TeachersPage from "./TeachersPage"; // вкажіть ваш шлях

function App() {
  return (
    <Routes>
      <Route path="/teachers" element={<TeachersPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/news/:id" element={<NewsPage />} />
    </Routes>
  );
}

export default App;
