import { ReactComponent as LeftArrowIcon } from 'assets/icons/leftArrowIcon.svg';
import styles from 'users/components/TweetHeader/TweetHeader.module.scss';

function TweetHeader({ userPostsHeader, userProfileHeader, label, info }) {
  if (userPostsHeader) {
    return (
      <div className={styles.tweetHeader}>
        <div className={styles.tweetIcon}>
          <LeftArrowIcon />
        </div>
        <div className={styles.tweetHeaderTitle}>{label}</div>
      </div>
    );
  }

  if (userProfileHeader) {
    return (
      <div className={styles.tweetHeader}>
        <div className={styles.tweetIcon}>
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
