import AdminNavigation from 'shared/components/Navigation/AdminNavigation';
import AdminHeader from 'admin/AdminHeader/AdminHeader';
import AdminTweetList from 'admin/AdminTweetList/AdminTweetList';
import styles from 'admin/pages/AdminMain.module.scss';

function AdminMain() {
  return (
    <div className="adminContainer">
      <div className={styles.container}>
        <AdminNavigation className={styles.navigation} />
        <div className={styles.main}>
          <AdminHeader className={styles.header} />
          <AdminTweetList className={styles.list} />
        </div>
      </div>
    </div>
  );
}

export default AdminMain;
