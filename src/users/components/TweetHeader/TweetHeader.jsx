import { ReactComponent as LeftArrowIcon } from 'assets/icons/leftArrowIcon.svg';
import { useNavigate } from 'react-router-dom';
import styles from 'users/components/TweetHeader/TweetHeader.module.scss';

function TweetHeader({ userPostsHeader, userProfileHeader, label, info }) {
  const navigate = useNavigate();

  const handleGoBackOnePage = () => {
    navigate(-1);
  };

  if (userPostsHeader) {
    return (
      <div className={styles.tweetHeader}>
        <div
          className={styles.tweetIcon}
          onClick={handleGoBackOnePage}
          role="presentation"
        >
          <LeftArrowIcon />
        </div>
        <div className={styles.tweetHeaderTitle}>{label}</div>
      </div>
    );
  }

  if (userProfileHeader) {
    return (
      <div className={styles.tweetHeader}>
        <div
          className={styles.tweetIcon}
          onClick={handleGoBackOnePage}
          role="presentation"
        >
          <LeftArrowIcon />
        </div>
        <div className={styles.tweetHeaderTitle}>
          <div className={styles.tweetHeaderLabel}>{label}</div>
          <div className={styles.tweetHeaderInfo}>{info}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tweetHeader}>
      <div className={styles.tweetHeaderTitle}>{label}</div>
    </div>
  );
}

export default TweetHeader;
