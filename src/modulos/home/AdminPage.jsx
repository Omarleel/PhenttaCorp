import { Navigate, Route, Routes } from "react-router-dom/dist"
import { DashboardPage } from "../admin/DashboardPage"
import { Sidebar } from "../../components/sidebar/Sidebar"

export const AdminPage = () => {
  return (
    <section className="flex h-screen overflow-hidden bg-gray-100 dark:bg-[#121212] dark:text-white">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <Routes>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="*" element={<Navigate to="dashboard" />} />
        </Routes>
      </div>
    </section>
  );
}
