import AdminNavigation from 'shared/components/Navigation/AdminNavigation';
import AdminHeader from 'admin/AdminHeader/AdminHeader';
import AdminUserCardList from 'admin/AdminUserCard/AdminUserCardList';
import styles from 'admin/pages/AdminMain.module.scss';
// import { getAdminUsers } from 'api/admin';
// import { useEffect, useState } from 'react';
// import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';
import { useUsers } from 'contexts/UsersContext';

function AdminUserList(cardItems) {
  const { fetchAdminUsers, adminUsers } = useUsers();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (authToken && adminUsers.length === 0) {
      fetchAdminUsers();
    }
  }, [fetchAdminUsers, adminUsers.length]);

  return (
    <div className={styles.adminUserContainer}>
      <div className={styles.container}>
        <AdminNavigation className={styles.navigation} />
        <div className={styles.main}>
          <AdminHeader
            adminUser
            label="使用者清單"
            className={styles.AdminHeader}
          />
          <AdminUserCardList cardItems={cardItems} className={styles.list} />
        </div>
      </div>
    </div>
  );
}

export default AdminUserList;
