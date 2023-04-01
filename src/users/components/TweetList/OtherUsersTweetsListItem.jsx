import { useAuth } from 'contexts/AuthContext';
import { useUsers } from 'contexts/UsersContext';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'shared/components/UIElements/Button';
import styles from 'users/components/TweetList/TweetListItem.module.scss';

function OtherUsersTweetsListItem({
  followersName,
  followingUserName,
  tweetContent,
  onNavigateProfile,
  followId,
}) {
  const { updateUserFollow, deleteUserFollow, currUserFollowList } = useUsers();
  const { currentUser } = useAuth();
  const { userId } = useParams();

  const [isUserFollowing, setIsUserFollowing] = useState(null);
  const prevIsUserFollowingRef = useRef(null);

  useEffect(() => {
    if (currUserFollowList) {
      const isFollowing = currUserFollowList.some(
        (id) => id.followingId === +followId
      );
      if (isFollowing !== prevIsUserFollowingRef.current) {
        setIsUserFollowing(isFollowing);
        prevIsUserFollowingRef.current = isFollowing;
      }
    }
  }, [currUserFollowList, followId]);

  const handleToggleFollowing = async (followUserId, pathId) => {
    if (isUserFollowing && currentUser?.id !== followId) {
      await deleteUserFollow(followUserId, pathId);
      setIsUserFollowing(false); // update the state after deleting
      return;
    }
    if (!isUserFollowing && currentUser?.id !== followId) {
      await updateUserFollow({ id: followUserId }, pathId);
      setIsUserFollowing(true); // update the state after adding
    }
  };

  const button = !isUserFollowing ? (
    <Button
      inverse
      className={styles.infoBtn}
      onClick={() => handleToggleFollowing(followId, userId)}
    >
      跟隨
    </Button>
  ) : (
    <Button
      className={styles.infoBtn}
      onClick={() => handleToggleFollowing(followId, userId)}
    >
      正在跟隨
    </Button>
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
            {followersName || followingUserName}
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
