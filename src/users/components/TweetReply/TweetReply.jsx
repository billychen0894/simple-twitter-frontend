import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import Avatar from 'shared/components/UIElements/Avatar';
import Rating from 'shared/components/UIElements/Rating';
import { ModalContentContext } from 'contexts/ModalContentContext';
import styles from 'users/components/TweetReply/TweetReply.module.scss';

function TweetReply({
  image,
  name,
  username,
  tweetContent,
  time,
  date,
  commentCount,
  likeCount,
  userId,
}) {
  const navigate = useNavigate();
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

  const handleNavigateProfile = (e) => {
    e.stopPropagation();
    navigate(`/${userId}`);
  };

  return (
    <div className={styles.tweetReplyPost}>
      <div className={styles.userInfo}>
        <Avatar
          image={image}
          className={styles.avatar}
          onClick={handleNavigateProfile}
        />
        <div className={styles.info}>
          <span
            className={styles.name}
            onClick={handleNavigateProfile}
            role="presentation"
          >
            {name}
          </span>
          <span className={styles.username}>@{username}</span>
        </div>
      </div>
      <div className={styles.tweetReplyPostContainer}>
        <div className={styles.contentContainer}>
          <span className={styles.content}>{tweetContent}</span>
        </div>
        <div className={styles.timestamp}>
          <span>
            {time} · {date}
          </span>
        </div>
        <hr className={styles.divider} />
        <div className={styles.ratingContainer}>
          <span>
            {commentCount}
            <span className={styles.ratingText}>回覆</span>
          </span>
          <span>
            {likeCount}
            <span className={styles.ratingText}>喜歡次數</span>
          </span>
        </div>
        <hr className={styles.divider} />
        <div className={styles.iconsContainer}>
          <Link
            to="/compose/tweet"
            className={styles.link}
            state={{ background: location, action: 'TWEET' }}
            onClick={handleModalType}
          >
            <Rating
              comment
              className={styles.commentIcon}
              style={{ width: '2.5rem', height: '2.5rem' }}
            />
          </Link>
          <Rating
            like
            className={styles.likeIcon}
            style={{ width: '2.5rem', height: '2.5rem' }}
            onClick={handleToggleLike}
          />
        </div>
      </div>
    </div>
  );
}

export default TweetReply;
