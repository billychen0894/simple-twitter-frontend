import { useEffect } from 'react';
import { MoonLoader } from 'react-spinners';
import AdminHeader from 'admin/AdminHeader/AdminHeader';
import AdminTweetList from 'admin/AdminTweetList/AdminTweetList';
import { useTweets } from 'contexts/TweetsContext';
import { useAdmin } from 'contexts/AdminContext';
import { toast } from 'react-toastify';
import styles from 'admin/pages/AdminMain.module.scss';

function AdminMain() {
  const { tweets, fetchTweets, isLoading, setTweets } = useTweets();
  const { deleteUserTweet } = useAdmin();
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    if (authToken && tweets.length === 0) {
      fetchTweets();
    }
  }, [fetchTweets, tweets.length, tweets]);

  const handleDeleteUserTweet = async (id) => {
    const response = await deleteUserTweet(id);

    if (response.status === 'error') {
      toast.error(response.message);
      return;
    }
    toast.success('刪除成功!');
    const updatedTweets = tweets.filter((tweet) => tweet.id !== id);
    if (updatedTweets) {
      setTweets(updatedTweets);
    }
  };

  return (
    <div className={styles.adminMainContainer}>
      <AdminHeader adminMain label="推文清單" />
      {!isLoading ? (
        <AdminTweetList
          listItems={tweets}
          onHandleDeleteUserTweet={handleDeleteUserTweet}
        />
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

export default AdminMain;
