import Avatar from 'shared/components/UIElements/Avatar';
import Button from 'shared/components/UIElements/Button';
import styles from 'shared/components/Followers/FollowersListItem.module.scss';

function FollowersListItem({ following }) {
  return (
    <li className={styles.followersListItem}>
      <div className={styles.followersContent}>
        <Avatar />
        <div className={styles.followersInfoContainer}>
          <div className={styles.followersInfo}>
            <span className={styles.name}>Pizza</span>
            <span className={styles.username}>@pizzahut</span>
          </div>
          <Button inverse={!following} className={styles.followBtn}>
            {following ? '正在跟隨' : '跟隨'}
          </Button>
        </div>
      </div>
    </li>
  );
}

export default FollowersListItem;
