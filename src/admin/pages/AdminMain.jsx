import AdminNavigation from 'shared/components/Navigation/AdminNavigation';
import AdminHeader from 'admin/AdminHeader/AdminHeader';
import AdminTweetList from 'admin/AdminTweetList/AdminTweetList';
import styles from 'admin/pages/AdminMain.module.scss';
import { useTweets } from 'contexts/TweetsContext';
import { useEffect } from 'react';
import { MoonLoader } from 'react-spinners';

function AdminMain() {
  const { tweets, fetchTweets, isLoading } = useTweets();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (authToken && tweets.length === 0) {
      console.log('tweets', tweets);
      console.log('authToken');
      fetchTweets();
    }
  }, [fetchTweets, tweets.length, tweets]);

  return (
    <div className="adminContainer">
      <div className={styles.container}>
        <AdminNavigation className={styles.navigation} />
        <div className={styles.main}>
          <AdminHeader adminMain label="推文清單" className={styles.header} />
          {!isLoading ? (
            <AdminTweetList className={styles.list} listItems={tweets} />
          ) : undefined}
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
      </div>
    </div>
  );
}

export default AdminMain;
