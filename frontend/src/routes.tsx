import { Routes, Route } from "react-router-dom";
import { TestPage } from "./pages/TestPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/teste" element={<TestPage />} />
    </Routes>
  );
}   