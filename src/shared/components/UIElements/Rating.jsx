import styles from 'shared/components/UIElements/Rating.module.scss';
import { ReactComponent as CommentIcon } from 'assets/icons/commentIcon.svg';
import { ReactComponent as LikeIcon } from 'assets/icons/likeIcon.svg';

function Rating({ className, comment, like, ratingCount }) {
  let icon;

  if (comment) {
    icon = (
      <div className={`${styles.iconContainer} ${styles.commentIcon}`}>
        <CommentIcon />
      </div>
    );
  }

  if (like) {
    icon = (
      <div className={`${styles.iconContainer} ${styles.likeIcon}`}>
        <LikeIcon />
      </div>
    );
  }

  return (
    <div className={`${styles.ratingContainer} ${className}`}>
      {icon}
      <span className={styles.ratingCount}>{ratingCount}</span>
    </div>
  );
}

export default Rating;
