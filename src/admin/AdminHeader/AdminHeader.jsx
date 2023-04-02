import styles from 'users/components/TweetHeader/TweetHeader.module.scss';

function AdminHeader({ adminMain, adminUser, label }) {
  if (adminMain) {
    return (
      <div className={styles.tweetHeader}>
        <h2 className={styles.tweetHeaderTitle}>{label}</h2>
      </div>
    );
  }
  if (adminUser) {
    return (
      <div className={styles.tweetHeader}>
        <h2 className={styles.tweetHeaderTitle}>{label}</h2>
      </div>
    );
  }
}
export default AdminHeader;
