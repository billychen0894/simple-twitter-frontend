import { useEffect } from 'react';
import { MoonLoader } from 'react-spinners';

import { useAuth } from 'contexts/AuthContext';
import { useTweets } from 'contexts/TweetsContext';
import TweetHeader from 'users/components/TweetHeader/TweetHeader';
import TweetList from 'users/components/TweetList/TweetList';
import TweetPost from 'users/components/TweetPost/TweetPost';
import styles from 'users/pages/Home.module.scss';

function UserTweet() {
  const { tweets, fetchTweets, isLoading } = useTweets();
  const { currentUser } = useAuth();

  // fetchTweets when user logs in
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (authToken && tweets.length === 0) {
      fetchTweets();
    }
  }, [fetchTweets, tweets.length]);

  return (
    <div className={styles.tweet}>
      <TweetHeader label="首頁" />
      <TweetPost placeholder="有什麼新鮮事嗎?" userId={currentUser?.id} />
      {!isLoading ? (
        <TweetList listType="homeTweets" listItems={tweets} />
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
  );
}

export default UserTweet;
