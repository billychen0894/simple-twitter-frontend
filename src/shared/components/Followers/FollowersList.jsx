import Card from 'shared/components/UIElements/Card';
import FollowersListItem from 'shared/components/Followers/FollowersListItem';
import styles from 'shared/components/Followers/FollowersList.module.scss';
import { useUsers } from 'contexts/UsersContext';
import { useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { useLocation } from 'react-router-dom';

function FollowersList() {
  const { top10Users, currUserFollowList, deleteUserFollow, updateUserFollow } =
    useUsers();

  const { fetchTop10Users } = useUsers();
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchTop10Users();
  }, [fetchTop10Users]);

  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const secondSegment = pathSegments[1];

  const handleToggleFollowing = (userId) => {
    const isFollowing = currUserFollowList.some(
      (user) => user.followingId === userId
    );
    if (isFollowing && currentUser?.id !== userId) {
      return deleteUserFollow(userId, secondSegment);
    }

    if (!isFollowing && currentUser?.id !== userId) {
      return updateUserFollow({ id: userId }, secondSegment);
    }
    return null;
  };

  return (
    <div className={styles.followers}>
      <Card className={styles.followersListContainer}>
        <h2>推薦跟隨</h2>
        <hr />
        <div>
          <ul>
            {top10Users
              ? top10Users.map((item) => {
                  return (
                    <FollowersListItem
                      key={item.id}
                      userId={item.id}
                      name={item.name}
                      avatar={item.avatar}
                      account={item.account}
                      isFollowing={
                        currUserFollowList
                          ? currUserFollowList.some(
                              (user) => user.followingId === item.id
                            )
                          : false
                      }
                      onToggleFollow={handleToggleFollowing}
                    />
                  );
                })
              : undefined}
          </ul>
        </div>
      </Card>
    </div>
  );
}
export default FollowersList;
