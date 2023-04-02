import { useEffect } from 'react';
import { MoonLoader } from 'react-spinners';

import AdminHeader from 'admin/AdminHeader/AdminHeader';
import AdminUserCardList from 'admin/AdminUserCard/AdminUserCardList';
import { useAdmin } from 'contexts/AdminContext';
import styles from 'admin/pages/AdminUserList.module.scss';

function AdminUserList() {
  const { fetchAllUsers, isLoading, usersList } = useAdmin();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (authToken && usersList.length === 0) {
      fetchAllUsers();
    }
  }, [fetchAllUsers, usersList.length]);

  return (
    <div className={styles.adminMainContainer}>
      <AdminHeader adminUser label="使用者列表" />
      {!isLoading ? <AdminUserCardList cardItems={usersList} /> : undefined}
      <MoonLoader
        color="#FF974A"
        loading={isLoading}
        speedMultiplier={1}
        cssOverride={{
          margin: '0 auto',
          position: 'relative',
          top: '25%',
        }}
      />
    </div>
  );
}

export default AdminUserList;
