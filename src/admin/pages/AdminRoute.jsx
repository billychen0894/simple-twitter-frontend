import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminMain from 'admin/pages/AdminMain';
import AdminUserList from 'admin/pages/AdminUserList';

function AdminRoute() {
  return (
    <div className="routComtainer">
      <BrowserRouter>
        <Routes>
          <Route path="admin_main" element={<AdminMain />} />
          <Route path="admin_user_list" element={<AdminUserList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AdminRoute;
