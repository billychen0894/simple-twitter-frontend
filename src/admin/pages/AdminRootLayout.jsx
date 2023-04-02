import { Outlet } from 'react-router-dom';

import AdminNavigation from 'shared/components/Navigation/AdminNavigation';
import styles from 'admin/pages/AdminRootLayout.module.scss';

function AdminRootLayout() {
  return (
    <div className={styles.adminRootContainer}>
      <AdminNavigation />
      <div className={styles.contentContainer}>
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminRootLayout;
