import { ReactComponent as LikeIcon } from 'assets/icons/likeIcon.svg';
import { ReactComponent as CommentIcon } from 'assets/icons/commentIcon.svg';
import styles from 'admin/AdminUserCard/AdminUserCardItem.module.scss';
import Avatar from 'shared/components/UIElements/Avatar';
// import Card from 'shared/components/UIElements/Card';
import UserBanner from 'shared/components/UIElements/UserBanner';

function AdminUserCardItem({
  name,
  userName,
  commentCount,
  likeCount,
  followerCount,
  followingCount,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <UserBanner className={styles.banner} />
        <div className={styles.userInfo}>
          <div className={styles.avatarWrapper}>
            {/* <div className={styles.avatarBlock} /> */}
            <Avatar
              className={styles.avatar}
              overlayStyles={styles.overlay}
              // image={avatar}
              defaultAvatarStyle={styles.defaultAvatar}
            />
          </div>
          <h1 className={styles.userName}>{name}</h1>
          <h2 className={styles.userAccountName}>@{userName}</h2>
          <div className={styles.tweetsRelatedCount}>
            <CommentIcon className={styles.commentIcon} />
            <span className={styles.tweetCount}>{commentCount}</span>
            <LikeIcon className={styles.likeIcon} />
            <span className={styles.likeCount}>{likeCount}</span>
          </div>
          <div className={styles.followRelatedCount}>
            <span
              className={styles.followingCount}
            >{`${followingCount}個追隨中`}</span>
            <span className={styles.followerCount}>
              {`${followerCount}`}位跟隨者
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdminUserCardItem;
