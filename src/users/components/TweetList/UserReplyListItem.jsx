import styles from 'users/components/TweetList/TweetListItem.module.scss';

function UserReplyListItem({
  name,
  userName,
  time,
  userToReply,
  tweetContent,
}) {
  return (
    <>
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <span className={styles.userName}>@{userName}</span>
        <span>·</span>
        <time className={styles.time}>{time}</time>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.replyContainer}>
          <span>回覆</span>
          <span className={styles.user}>@{userToReply}</span>
        </div>
        <span className={styles.content}>{tweetContent}</span>
      </div>
    </>
  );
}
export default UserReplyListItem;
