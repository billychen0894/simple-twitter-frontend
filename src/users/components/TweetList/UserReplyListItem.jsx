import styles from 'users/components/TweetList/TweetListItem.module.scss';

function UserReplyListItem({
  currentUserName,
  userAccountName,
  time,
  tweetRepliedUserAccount,
  tweetContent,
  onNavigateProfile,
}) {
  return (
    <>
      <div className={styles.info}>
        <span
          className={styles.name}
          onClick={onNavigateProfile}
          role="presentation"
        >
          {currentUserName}
        </span>
        <span className={styles.username}>@{userAccountName}</span>
        <span>·</span>
        <time className={styles.time}>{time}</time>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.replyContainer}>
          <span>回覆</span>
          <span className={styles.user}>@{tweetRepliedUserAccount}</span>
        </div>
        <span className={styles.content}>{tweetContent}</span>
      </div>
    </>
  );
}
export default UserReplyListItem;
