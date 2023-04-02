import { useEffect } from 'react';

import AdminHeader from 'admin/AdminHeader/AdminHeader';
import AdminTweetList from 'admin/AdminTweetList/AdminTweetList';
import { useTweets } from 'contexts/TweetsContext';
import { MoonLoader } from 'react-spinners';
import styles from 'admin/pages/AdminMain.module.scss';

function AdminMain() {
  const { tweets, fetchTweets, isLoading } = useTweets();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (authToken && tweets.length === 0) {
      fetchTweets();
    }
  }, [fetchTweets, tweets.length, tweets]);

  return (
    <div className={styles.adminMainContainer}>
      <AdminHeader adminMain label="推文清單" />
      {!isLoading ? <AdminTweetList listItems={tweets} /> : undefined}
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

export default AdminMain;
