import AdminNavigation from 'shared/components/Navigation/AdminNavigation';
import AdminHeader from 'admin/AdminHeader/AdminHeader';
import AdminUserCardList from 'admin/AdminUserCard/AdminUserCardList';
import styles from 'admin/pages/AdminMain.module.scss';

function AdminUserList() {
  return (
    <div className={styles.adminUserContainer}>
      <div className={styles.container}>
        <AdminNavigation className={styles.navigation} />
        <div className={styles.main}>
          <AdminHeader AdminUser className={styles.AdminHeader} />
          <AdminUserCardList className={styles.list} />
        </div>
      </div>
    </div>
  );
}

export default AdminUserList;
