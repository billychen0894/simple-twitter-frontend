import { useAuth } from 'contexts/AuthContext';
import { useTweets } from 'contexts/TweetsContext';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import { formatTimestamp } from 'shared/utils/formattingTime';
import TweetHeader from 'users/components/TweetHeader/TweetHeader';
import TweetList from 'users/components/TweetList/TweetList';
import TweetReply from 'users/components/TweetReply/TweetReply';
import styles from 'users/pages/Home.module.scss';

function UserTweetReply() {
  const { currentUser } = useAuth();
  const { tweetId } = useParams();
  const { fetchTweet, currentTweet, replies, fetchReplies, isLoading } =
    useTweets();
  const [isLiked, setIsLiked] = useState(null);
  const [likes, setLikes] = useState(currentTweet?.Likes.length);

  useEffect(() => {
    if (tweetId) {
      fetchTweet(tweetId);
      fetchReplies(tweetId);
    }
  }, [fetchTweet, tweetId, fetchReplies]);

  useEffect(() => {
    if (currentTweet) {
      setLikes(currentTweet?.Likes.length);
      setIsLiked(
        currentTweet?.Likes.some((like) => like.User_id === currentUser?.id)
      );
    }
  }, [currentTweet, currentUser?.id]);

  let time;
  let date;

  if (currentTweet?.createdAt) {
    time = formatTimestamp(currentTweet?.createdAt, 'time');
    date = formatTimestamp(currentTweet?.createdAt, 'date');
  }

  return (
    <div className={styles.tweet}>
      <TweetHeader userPostsHeader label="推文" />
      {!isLoading ? (
        <>
          <TweetReply
            image={currentTweet?.User.avatar}
            name={currentTweet?.User.name}
            username={currentTweet?.User.account}
            tweetContent={currentTweet?.description}
            time={time}
            date={date}
            commentCount={replies.length}
            likeCount={likes}
            isLiked={isLiked}
            tweetId={tweetId}
            onClickLike={setIsLiked}
            handleLikes={setLikes}
          />
          <TweetList
            listType="tweetReply"
            listItems={replies}
            currentAccountName={currentTweet?.User.account}
          />
        </>
      ) : (
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
      )}
    </div>
  );
}

export default UserTweetReply;
