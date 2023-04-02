import { Outlet } from 'react-router-dom';

import AdminNavigation from 'shared/components/Navigation/AdminNavigation';

function AdminRootLayout() {
  return (
    <div className="app-container">
      <AdminNavigation />
      <div className="content-container">
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminRootLayout;
