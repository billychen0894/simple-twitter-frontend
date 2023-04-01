import AdminNavigation from 'shared/components/Navigation/AdminNavigation';
import AdminHeader from 'admin/AdminHeader/AdminHeader';
import AdminTweetList from 'admin/AdminTweetList/AdminTweetList';
import styles from 'admin/pages/AdminMain.module.scss';
import { useTweets } from 'contexts/TweetContext';
import { useEffect } from 'react';

function AdminMain() {
  const { tweets, fetchTweets } = useTweets();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    console.log('token', authToken);

    if (authToken && tweets.length === 0) {
      fetchTweets();
    }
  }, [fetchTweets, tweets.length]);

  return (
    <div className="adminContainer">
      <div className={styles.container}>
        <AdminNavigation className={styles.navigation} />
        <div className={styles.main}>
          <AdminHeader adminMain label="推文清單" className={styles.header} />
          <AdminTweetList className={styles.list} listTweets={tweets} />
        </div>
      </div>
    </div>
  );
}

export default AdminMain;
