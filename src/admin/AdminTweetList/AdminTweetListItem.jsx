import Avatar from 'shared/components/UIElements/Avatar';
import { ReactComponent as CloseIcon } from 'assets/icons/closeIcon.svg';
import styles from 'admin/AdminTweetList/AdminTweetListItem.module.scss';

function AdminTweetListItem({
  tweetId,
  name,
  userAccountName,
  content,
  time,
  userAvatar,
  onHandleDeleteUserTweet,
}) {
  return (
    <div className={styles.container}>
      <Avatar className={styles.avatar} image={userAvatar} />
      <div className={styles.tweetListItem}>
        <div className={styles.info}>
          <span className={styles.name}>{name}</span>
          <span className={styles.username}>@{userAccountName}</span>
          <span>·</span>
          <time className={styles.time}>{time}</time>
        </div>
        <div className={styles.contentContainer}>
          <span className={styles.content}>{content}</span>
        </div>
        <div
          className={styles.closeIcon}
          onClick={() => onHandleDeleteUserTweet(tweetId)}
          role="presentation"
        >
          <CloseIcon />
        </div>
      </div>
    </div>
  );
}

export default AdminTweetListItem;
