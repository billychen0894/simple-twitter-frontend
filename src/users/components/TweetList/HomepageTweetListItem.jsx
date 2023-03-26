import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ModalContentContext } from 'contexts/ModalContentContext';
import Rating from 'shared/components/UIElements/Rating';
import styles from 'users/components/TweetList/TweetListItem.module.scss';

function HomepageTweetListItem({
  name,
  username,
  time,
  tweetContent,
  commentCount,
  likeCount,
  onNavigateProfile,
}) {
  const location = useLocation();
  const modalContentCtx = useContext(ModalContentContext);
  const { handleModalClick } = modalContentCtx;

  const handleModalType = (e) => {
    e.stopPropagation();
    handleModalClick('reply');
  };

  const handleToggleLike = (e) => {
    e.stopPropagation();
    // handle request to update whether user like or unlike certain tweets
  };

  return (
    <>
      <div className={styles.info}>
        <span
          className={styles.name}
          onClick={onNavigateProfile}
          role="presentation"
        >
          {name}
        </span>
        <span className={styles.username}>@{username}</span>
        <span>·</span>
        <time className={styles.time}>{time}</time>
      </div>
      <div className={styles.contentContainer}>
        <span className={styles.content}>{tweetContent}</span>
      </div>
      <div className={styles.ratingContainer}>
        <Link
          to="/compose/tweet"
          className={styles.link}
          state={{ background: location, action: 'TWEET' }}
          onClick={handleModalType}
        >
          <Rating comment ratingCount={commentCount} />
        </Link>
        <Rating like ratingCount={likeCount} onClick={handleToggleLike} />
      </div>
    </>
  );
}
export default HomepageTweetListItem;
