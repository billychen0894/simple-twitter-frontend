import styles from 'shared/components/UIElements/Rating.module.scss';
import { ReactComponent as CommentIcon } from 'assets/icons/commentIcon.svg';
import { ReactComponent as LikeIcon } from 'assets/icons/likeIcon.svg';
import { ReactComponent as ToggleLikeIcon } from 'assets/icons/toggleLikeIcon.svg';

function Rating({
  className,
  comment,
  like,
  ratingCount,
  onClick,
  style,
  toggleLike,
}) {
  let icon;

  if (comment) {
    icon = (
      <div
        className={`${styles.iconContainer} ${styles.commentIcon}`}
        style={style}
      >
        <CommentIcon />
      </div>
    );
  }

  if (like) {
    icon = (
      <div
        className={`${styles.iconContainer} ${styles.likeIcon} ${
          toggleLike ? styles.likedIcon : undefined
        }`}
        style={style}
      >
        {toggleLike ? <ToggleLikeIcon /> : <LikeIcon />}
      </div>
    );
  }

  return (
    <div
      className={`${styles.ratingContainer} ${className}`}
      onClick={onClick}
      role="presentation"
    >
      {icon}
      <span className={styles.ratingCount}>{ratingCount}</span>
    </div>
  );
}

export default Rating;
