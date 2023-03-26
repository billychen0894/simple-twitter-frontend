import Avatar from 'shared/components/UIElements/Avatar';
import Button from 'shared/components/UIElements/Button';
import styles from 'shared/components/Followers/FollowersListItem.module.scss';
import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';

function FollowersListItem({ following, name, username }) {
  const cx = classNames.bind(styles);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = 'u1';

  const buttonStyles = cx({
    followBtn: true,
    following,
  });

  const handleNavigateProfile = (e) => {
    e.stopPropagation();
    if (location && location.pathname === `/${userId}`) {
      return;
    }
    navigate(`/${userId}`);
  };

  return (
    <li className={styles.followersListItem}>
      <div className={styles.followersContent}>
        <Avatar className={styles.avatar} onClick={handleNavigateProfile} />
        <div className={styles.followersInfoContainer}>
          <div className={styles.followersInfo}>
            <span
              className={styles.name}
              title={name}
              onClick={handleNavigateProfile}
              role="presentation"
            >
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
