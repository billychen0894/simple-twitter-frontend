import TweetEditor from 'users/components/TweetPost/TweetEditor';
import Avatar from 'shared/components/UIElements/Avatar';
import styles from 'users/components/TweetReplyModal/TweetReplyModal.module.scss';

function TweetReplyModal({
  name,
  userName,
  time,
  userToReply,
  tweetContent,
  onInputChange,
  inputValue,
  onInputTouch,
}) {
  return (
    <div className={styles.modalReplyContentContainer}>
      <div className={styles.tweetReplyContainer}>
        <div className={styles.avatarContainer}>
          <Avatar className={styles.retweetAvatar} />
          <div className={styles.outline} />
        </div>
        <div className={styles.tweetReplyContent}>
          <div className={styles.info}>
            <span className={styles.name}>{name}</span>
            <span className={styles.userName}>@{userName}</span>
            <span>·</span>
            <time className={styles.time}>{time}</time>
          </div>
          <div className={styles.contentContainer}>
            <span className={styles.content}>{tweetContent}</span>
          </div>
        </div>
      </div>
      <div className={styles.replyToContainer}>
        <div className={styles.outlineContainer}>
          <div className={styles.outline} />
        </div>
        <div className={styles.replyContainer}>
          <span>回覆給</span>
          <span className={styles.user}>@{userToReply}</span>
        </div>
      </div>
      <div className={styles.tweetReplyContainer}>
        <div className={styles.avatarContainer}>
          <Avatar className={styles.userAvatar} />
        </div>
        <div className={styles.tweetPostContainer}>
          <TweetEditor
            className={styles.input}
            placeholder="推你的回覆"
            onInputChange={onInputChange}
            onInputTouch={onInputTouch}
            inputValue={inputValue}
          />
        </div>
      </div>
    </div>
  );
}
export default TweetReplyModal;
