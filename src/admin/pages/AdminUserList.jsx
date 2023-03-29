import AdminNavigation from 'shared/components/Navigation/AdminNavigation';
import AdminUserCardList from 'admin/AdminUserCard/AdminUserCardList';
import styles from 'admin/pages/AdminMain.module.scss';

function AdminUserList() {
  return (
    <div className={styles.container}>
      <AdminNavigation className={styles.navigation} />
      <AdminUserCardList calssName={styles.cardList} />
    </div>
  );
}

export default AdminUserList;
