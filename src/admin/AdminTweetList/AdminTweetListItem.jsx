import Avatar from 'shared/components/UIElements/Avatar';
import styles from 'admin/AdminTweetList/AdminTweetListItem.module.scss';
import { ReactComponent as CloseIcon } from 'assets/icons/closeIcon.svg';

function AdminTweetListItem() {
  return (
    <div className={styles.tweetContainer}>
      <Avatar className={styles.avatar} />
      <div className={styles.info}>
        <span className={styles.name}>Apple</span>
        <span className={styles.userName}>@apple</span>
        <span>·</span>
        <span className={styles.time}>3小時</span>
        <p className={styles.tweetCotent}>
          Lorem ipsum dolor sit amet, consectetur adipiscing...
        </p>
      </div>
      {/* <div className={styles.contentContainer}>
        
      </div> */}
      <CloseIcon className={styles.closeIcon} />
    </div>
  );
}

export default AdminTweetListItem;
