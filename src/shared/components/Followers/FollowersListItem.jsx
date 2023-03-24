import Avatar from 'shared/components/UIElements/Avatar';
import Button from 'shared/components/UIElements/Button';
import styles from 'shared/components/Followers/FollowersListItem.module.scss';
import classNames from 'classnames/bind';

function FollowersListItem({ following, name, username }) {
  const cx = classNames.bind(styles);

  const buttonStyles = cx({
    followBtn: true,
    following,
  });
  return (
    <li className={styles.followersListItem}>
      <div className={styles.followersContent}>
        <Avatar className={styles.avatar} />
        <div className={styles.followersInfoContainer}>
          <div className={styles.followersInfo}>
            <span className={styles.name} title={name}>
              Pizza
            </span>
            <span className={styles.username} title={username}>
              @pizzahut
            </span>
          </div>
          <Button inverse={!following} className={buttonStyles}>
            {following ? '正在跟隨' : '跟隨'}
          </Button>
        </div>
      </div>
    </li>
  );
}

export default FollowersListItem;
