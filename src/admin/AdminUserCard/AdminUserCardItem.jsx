import { ReactComponent as LikeIcon } from 'assets/icons/likeIcon.svg';
import { ReactComponent as TweetIcon } from 'assets/icons/tweetIcon.svg';
import Avatar from 'shared/components/UIElements/Avatar';
import UserBanner from 'shared/components/UIElements/UserBanner';
import styles from 'admin/AdminUserCard/AdminUserCardItem.module.scss';

function AdminUserCardItem({
  name,
  userAccountName,
  tweetsCount,
  likeCount,
  followerCount,
  followingCount,
  avatar,
  coverImage,
}) {
  return (
    <div className={styles.cardContainer}>
      <UserBanner className={styles.banner} image={coverImage} />
      <div className={styles.userInfo}>
        <div className={styles.avatarWrapper}>
          <Avatar
            className={styles.avatar}
            overlayStyles={styles.overlay}
            image={avatar}
            defaultAvatarStyle={styles.defaultAvatar}
          />
        </div>
        <h1 className={styles.userName}>{name}</h1>
        <h2 className={styles.userAccountName}>@{userAccountName}</h2>
        <div className={styles.tweetsRelatedCount}>
          <TweetIcon className={styles.tweetIcon} />
          <span className={styles.tweetCount}>{tweetsCount}</span>
          <LikeIcon className={styles.likeIcon} />
          <span className={styles.likeCount}>{likeCount}</span>
        </div>
        <div className={styles.followRelatedCount}>
          <span className={styles.followingCount}>
            {followingCount}
            <span className={styles.followingRelatedText}>&nbsp;個追隨中</span>
          </span>
          <span className={styles.followerCount}>
            {followerCount}
            <span className={styles.followingRelatedText}>&nbsp;位跟隨者</span>
          </span>
        </div>
      </div>
    </div>
  );
}
export default AdminUserCardItem;
