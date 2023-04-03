import TweetEditor from 'users/components/TweetPost/TweetEditor';
import Avatar from 'shared/components/UIElements/Avatar';
import styles from 'users/components/TweetReplyModal/TweetReplyModal.module.scss';

function TweetReplyModal({
  name,
  username,
  time,
  avatar,
  userToReply,
  tweetContent,
  onInputChange,
  inputValue,
  onInputTouch,
  currUserAvatar,
}) {
  return (
    <div className={styles.modalReplyContentContainer}>
      <div className={styles.tweetReplyContainer}>
        <div className={styles.avatarContainer}>
          <Avatar className={styles.retweetAvatar} image={avatar} />
          <div className={styles.outline} />
        </div>
        <div className={styles.tweetReplyContent}>
          <div className={styles.info}>
            <span className={styles.name}>{name}</span>
            <span className={styles.userName}>@{username}</span>
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
          <Avatar className={styles.userAvatar} image={currUserAvatar} />
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
