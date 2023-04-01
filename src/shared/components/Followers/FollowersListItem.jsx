import Avatar from 'shared/components/UIElements/Avatar';
import Button from 'shared/components/UIElements/Button';
import styles from 'shared/components/Followers/FollowersListItem.module.scss';
import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';

function FollowersListItem({
  isFollowing,
  name,
  account,
  userId,
  onToggleFollow,
  avatar,
}) {
  const cx = classNames.bind(styles);
  const navigate = useNavigate();
  const location = useLocation();

  const buttonStyles = cx({
    followBtn: true,
    following: isFollowing,
  });

  const handleNavigateProfile = (e) => {
    e.stopPropagation();
    if (location && location.pathname === `/${userId}`) {
      return;
    }
    navigate(`/${userId}`);
  };

  const handleToggleFollow = (e) => {
    e.preventDefault();
    onToggleFollow(userId);
  };

  return (
    <li className={styles.followersListItem}>
      <div className={styles.followersContent}>
        <Avatar
          className={styles.avatar}
          onClick={handleNavigateProfile}
          image={avatar}
        />
        <div className={styles.followersInfoContainer}>
          <div className={styles.followersInfo}>
            <span
              className={styles.name}
              title={name}
              onClick={handleNavigateProfile}
              role="presentation"
            >
              {name}
            </span>
            <span className={styles.username} title={account}>
              @{account}
            </span>
          </div>
          <Button
            type="button"
            inverse={!isFollowing}
            className={buttonStyles}
            onClick={handleToggleFollow}
          >
            {isFollowing ? '正在跟隨' : '跟隨'}
          </Button>
        </div>
      </div>
    </li>
  );
}

export default FollowersListItem;
