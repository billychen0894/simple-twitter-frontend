import Avatar from 'shared/components/UIElements/Avatar';
import styles from 'admin/AdminTweetList/AdminTweetListItem.module.scss';
import { ReactComponent as CloseIcon } from 'assets/icons/closeIcon.svg';

function AdminTweetListItem({ name, userName, content, time }) {
  return (
    <div className={styles.tweetContainer}>
      <Avatar className={styles.avatar} />
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.userName}>@{userName}</span>
        <span>·</span>
        <span className={styles.time}>{time}</span>
        <p className={styles.tweetContent}>{content}</p>
      </div>
      <div className={`${styles.iconContainer} ${styles.closeIcon}`}>
        <CloseIcon />
      </div>
    </div>
  );
}

export default AdminTweetListItem;
