import { useContext, useEffect, useState, useRef } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import Avatar from 'shared/components/UIElements/Avatar';
import Button from 'shared/components/UIElements/Button';
import { ReactComponent as MessageIcon } from 'assets/icons/messageBtnIcon.svg';
import { ReactComponent as NotifiBtnIcon } from 'assets/icons/notifiBtnIcon.svg';
import { ModalContentContext } from 'contexts/ModalContentContext';
import defaultProfileHeaderImage from 'assets/images/defaultProfileHeaderImage.png';
import styles from 'userProfile/componenets/UserProfileHeader.module.scss';
import { useAuth } from 'contexts/AuthContext';
import { useUsers } from 'contexts/UsersContext';

function UserProfileHeader() {
  const location = useLocation();
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const {
    fetchUser,
    fetchUserFollowers,
    fetchUserFollowings,
    user,
    deleteUserFollow,
    updateUserFollow,
    currUserFollowList,
    userFollowings,
    userFollowers,
  } = useUsers();
  const currentUserId = currentUser?.id;

  useEffect(() => {
    fetchUserFollowers(userId);
    fetchUserFollowings(userId);
    fetchUser(userId);
  }, [fetchUserFollowings, fetchUserFollowers, userId, fetchUser]);

  const modalContentCtx = useContext(ModalContentContext);
  const { handleModalClick } = modalContentCtx;

  const handleModalType = () => {
    handleModalClick('edit');
  };

  const [isUserFollowing, setIsUserFollowing] = useState(null);
  const prevIsUserFollowingRef = useRef(null);

  useEffect(() => {
    if (currUserFollowList) {
      const isFollowing = currUserFollowList.some(
        (id) => id.followingId === +userId
      );
      if (isFollowing !== prevIsUserFollowingRef.current) {
        setIsUserFollowing(isFollowing);
        prevIsUserFollowingRef.current = isFollowing;
      }
    }
  }, [currUserFollowList, userId]);

  const handleToggleFollowing = async (followUserId, pathId) => {
    if (isUserFollowing) {
      await deleteUserFollow(followUserId, pathId);
      setIsUserFollowing(false); // update the state after deleting
    } else {
      await updateUserFollow({ id: followUserId }, pathId);
      setIsUserFollowing(true); // update the state after adding
    }
  };

  let btnContent;
  if (userId && currentUserId !== +userId) {
    btnContent = (
      <>
        <MessageIcon />
        <NotifiBtnIcon />
        <Button
          className={styles.btn}
          inverse={!isUserFollowing}
          onClick={() => handleToggleFollowing(userId, userId)}
        >
          {isUserFollowing ? '正在跟隨' : '跟隨'}
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
              user?.coverImage || defaultProfileHeaderImage
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
              image={user?.avatar}
              defaultAvatarStyle={styles.defaultAvatar}
            />
          </div>
          <div className={styles.btnWrapper}>
            {currentUserId !== +userId ? (
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
            <span className={styles.name}>{user?.name}</span>
            <span>@{user?.account}</span>
          </div>
          <div>
            <span className={styles.userStatus}>{user?.introduction}</span>
          </div>
          <div className={styles.userRatingContainer}>
            <Link to="following">
              <span className={styles.userFollowingCount}>
                <span className={styles.count}>
                  {userFollowings.length}&nbsp;個
                </span>
                跟隨中
              </span>
            </Link>
            <Link to="followers">
              <span className={styles.userFollowersCount}>
                <span className={styles.count}>
                  {userFollowers.length}&nbsp;位
                </span>
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
