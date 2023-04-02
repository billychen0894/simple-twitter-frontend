import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ModalContentContext } from 'contexts/ModalContentContext';
import Rating from 'shared/components/UIElements/Rating';
import styles from 'users/components/TweetList/TweetListItem.module.scss';
import { useTweets } from 'contexts/TweetsContext';
import { useAuth } from 'contexts/AuthContext';
import { toast } from 'react-toastify';

function HomepageTweetListItem({
  name,
  userAccountName,
  time,
  tweetContent,
  commentCount,
  likeCount,
  onNavigateProfile,
  isLiked,
  tweetId,
  onClickLike,
  userId,
  listType,
}) {
  const location = useLocation();
  const modalContentCtx = useContext(ModalContentContext);
  const { handleModalClick, handleModalReplyTweetId } = modalContentCtx;
  const { likeTweet, unlikeTweet, fetchTweet } = useTweets();
  const [isTweetLoading, setIsTweetLoading] = useState(false);
  const { currentUser } = useAuth();
  const [userTweetLikes, setUserTweetLikes] = useState(likeCount || 0);

  const handleModalType = (e) => {
    e.stopPropagation();
    if (currentUser?.id && currentUser?.id === userId) {
      toast.warn('不能對自己的推文做回覆');
      return;
    }
    setIsTweetLoading(true);
    handleModalClick('reply');
    handleModalReplyTweetId(tweetId);
    fetchTweet(tweetId);
    setIsTweetLoading(false);
  };

  const handleToggleLike = async (e) => {
    e.stopPropagation();
    if (currentUser?.id && currentUser?.id === userId) {
      toast.warn('不能對自己的推文按讚');
      return;
    }

    if (listType === 'userTweets' && isLiked) {
      await unlikeTweet(tweetId);
      onClickLike(false);
      setUserTweetLikes((prevTweetLikes) => prevTweetLikes - 1);
      return;
    }

    if (listType === 'userTweets' && !isLiked) {
      await likeTweet(tweetId);
      onClickLike(true);
      setUserTweetLikes((prevTweetLikes) => prevTweetLikes + 1);
      return;
    }

    if (listType === 'like' && isLiked) {
      await unlikeTweet(tweetId);
      onClickLike(false);
      setUserTweetLikes((prevTweetLikes) => prevTweetLikes - 1);
      return;
    }

    if (listType === 'like' && !isLiked) {
      await likeTweet(tweetId);
      onClickLike(true);
      setUserTweetLikes((prevTweetLikes) => prevTweetLikes + 1);
      return;
    }

    if (isLiked) {
      await unlikeTweet(tweetId);
      setUserTweetLikes((prevTweetLikes) => prevTweetLikes - 1);
      onClickLike(false);
      return;
    }
    await likeTweet(tweetId);
    setUserTweetLikes((prevTweetLikes) => prevTweetLikes + 1);
    onClickLike(true);
  };

  return (
    <>
      <div className={styles.info}>
        <span
          className={styles.name}
          onClick={onNavigateProfile}
          role="presentation"
        >
          {!isTweetLoading ? name : undefined}
        </span>
        <span className={styles.username}>
          @{!isTweetLoading ? userAccountName : undefined}
        </span>
        <span>·</span>
        <time className={styles.time}>
          {!isTweetLoading ? time : undefined}
        </time>
      </div>
      <div className={styles.contentContainer}>
        <span className={styles.content}>
          {!isTweetLoading ? tweetContent : undefined}
        </span>
      </div>
      <div className={styles.ratingContainer}>
        {currentUser?.id !== +userId ? (
          <Link
            to="/compose/tweet"
            className={styles.link}
            state={{ background: location, action: 'TWEET' }}
            onClick={handleModalType}
          >
            <Rating comment ratingCount={commentCount} />
          </Link>
        ) : (
          <Rating
            comment
            ratingCount={commentCount}
            onClick={handleModalType}
          />
        )}
        <Rating
          like
          toggleLike={isLiked}
          ratingCount={userTweetLikes}
          onClick={handleToggleLike}
        />
      </div>
    </>
  );
}
export default HomepageTweetListItem;
