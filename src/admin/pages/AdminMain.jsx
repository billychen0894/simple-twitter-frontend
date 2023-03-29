import AdminNavigation from 'shared/components/Navigation/AdminNavigation';
import AdminTweetList from 'admin/AdminTweetList/AdminTweetList';
import styles from 'admin/pages/AdminMain.module.scss';

function AdminMain() {
  return (
    <div className={styles.container}>
      <AdminNavigation className={styles.navigation} />
      <AdminTweetList className={styles.tweetList} />
    </div>
  );
}

export default AdminMain;
