import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Avatar from 'shared/components/UIElements/Avatar';
import Button from 'shared/components/UIElements/Button';
import { ReactComponent as MessageIcon } from 'assets/icons/messageBtnIcon.svg';
import { ReactComponent as NotifiBtnIcon } from 'assets/icons/notifiBtnIcon.svg';
import { ModalContentContext } from 'contexts/ModalContentContext';
import defaultProfileHeaderImage from 'assets/images/defaultProfileHeaderImage.png';
import styles from 'userProfile/componenets/UserProfileHeader.module.scss';

function UserProfileHeader({ userInfo, userId }) {
  const {
    profileHeaderImage,
    avatar,
    name,
    username,
    profileStatus,
    following,
    followers,
  } = userInfo;
  const tempUserIdstate = 'u1';

  const [followBtnToggle, setFollowBtnToggle] = useState(false);

  const location = useLocation();

  const modalContentCtx = useContext(ModalContentContext);
  const { handleModalClick } = modalContentCtx;

  const handleModalType = () => {
    handleModalClick('edit');
  };

  const handleFollowBtnToggle = () => {
    setFollowBtnToggle(!followBtnToggle);
  };

  let btnContent;
  if (tempUserIdstate !== userId) {
    btnContent = (
      <>
        <MessageIcon />
        <NotifiBtnIcon />
        <Button
          className={styles.btn}
          inverse={!followBtnToggle}
          onClick={handleFollowBtnToggle}
        >
          {followBtnToggle ? '正在跟隨' : '跟隨'}
        </Button>
      </>
    );
  }
  return (
    <div className={styles.userProfileHeader}>
      <div className={styles.headerImageContainer}>
        <div className={styles.headerImageBlock} />
        <div
          className={styles.headerImage}
          style={{
            backgroundImage: `url(${
              profileHeaderImage || defaultProfileHeaderImage
            })`,
          }}
        />
      </div>
      <div className={styles.mainUserContent}>
        <div className={styles.avatarAndBtnWrapper}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatarBlock} />
            <Avatar
              className={styles.avatar}
              overlayStyles={styles.overlay}
              image={avatar}
              defaultAvatarStyle={styles.defaultAvatar}
            />
          </div>
          <div className={styles.btnWrapper}>
            {tempUserIdstate !== userId ? (
              btnContent
            ) : (
              <Button
                to="/edit_profile"
                className={styles.btn}
                inverse
                state={{ background: location, action: 'EDIT' }}
                onClick={handleModalType}
              >
                編輯個人資料
              </Button>
            )}
          </div>
        </div>
        <div className={styles.userInfoWrapper}>
          <div className={styles.usernames}>
            <span className={styles.name}>{name}</span>
            <span>@{username}</span>
          </div>
          <div>
            <span className={styles.userStatus}>{profileStatus}</span>
          </div>
          <div className={styles.userRatingContainer}>
            <Link to="following">
              <span className={styles.userFollowingCount}>
                <span className={styles.count}>{following.length}&nbsp;個</span>
                跟隨中
              </span>
            </Link>
            <Link to="followers">
              <span className={styles.userFollowersCount}>
                <span className={styles.count}>{followers.length}&nbsp;位</span>
                跟隨者
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserProfileHeader;
