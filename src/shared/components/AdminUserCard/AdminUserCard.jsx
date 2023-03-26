import { ReactComponent as LikeIcon } from 'assets/icons/likeIcon.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/commentIcon.svg';
import styles from 'shared/components/AdminUserCard/AdminUserCard.module.scss';
import Avatar from 'shared/components/UIElements/Avatar';
import Card from 'shared/components/UIElements/Card';
import UserBanner from 'shared/components/UIElements/UserBanner';

function AdminUserCard() {
  return (
    <Card className={styles.cardContainer}>
      <UserBanner />
      <div className={styles.userInfo}>
        <Avatar className={styles.avatar} />
        <h1 className={styles.userName}>John Doe</h1>
        <h2 className={styles.userAccountName}>@hellojohn</h2>
        <div className={styles.tweetsRelatedCount}>
          <CommentIcon className={styles.commentIcon} />
          <span className={styles.tweetCount}>1.5k</span>
          <LikeIcon className={styles.likeIcon} />
          <span className={styles.likeCount}>20k</span>
        </div>
        <div className={styles.followRelatedCount}>
          <span className={styles.followingCount}>59個追隨中</span>
          <span className={styles.followerCount}>60位跟隨者</span>
        </div>
      </div>
    </Card>
    // </div>
  );
}
export default AdminUserCard;
