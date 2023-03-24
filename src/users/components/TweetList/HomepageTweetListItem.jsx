import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ModalContentContext } from 'contexts/ModalContentContext';
import Rating from 'shared/components/UIElements/Rating';
import styles from 'users/components/TweetList/TweetListItem.module.scss';

function HomepageTweetListItem({
  name,
  userName,
  time,
  tweetContent,
  commentCount,
  likeCount,
}) {
  const location = useLocation();
  const modalContentCtx = useContext(ModalContentContext);
  const { handleModalClick } = modalContentCtx;

  const handleModalType = () => {
    handleModalClick('reply');
  };

  return (
    <>
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.userName}>@{userName}</span>
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
        <Rating like ratingCount={likeCount} />
      </div>
    </>
  );
}
export default HomepageTweetListItem;
