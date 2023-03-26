import Button from 'shared/components/UIElements/Button';
import styles from 'users/components/TweetList/TweetListItem.module.scss';

function OtherUsersTweetsListItem({
  name,
  tweetContent,
  inverse,
  onNavigateProfile,
}) {
  const button = inverse ? (
    <Button inverse className={styles.infoBtn}>
      跟隨
    </Button>
  ) : (
    <Button className={styles.infoBtn}>正在跟隨</Button>
  );

  return (
    <>
      <div className={styles.info}>
        <div className={styles.infoUsers}>
          <span
            className={styles.name}
            onClick={onNavigateProfile}
            role="presentation"
          >
            {name}
          </span>
        </div>
        <div className={styles.infoBtnContainer}>{button}</div>
      </div>
      <div className={styles.contentContainer}>
        <span className={styles.content}>{tweetContent}</span>
      </div>
    </>
  );
}
export default OtherUsersTweetsListItem;
