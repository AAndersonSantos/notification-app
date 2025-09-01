import { Routes, Route } from "react-router-dom";
import { NotificationList } from "./pages/notificationList";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<NotificationList />} />
    </Routes>
  );
}