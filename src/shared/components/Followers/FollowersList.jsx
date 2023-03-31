import Card from 'shared/components/UIElements/Card';
import FollowersListItem from 'shared/components/Followers/FollowersListItem';
import styles from 'shared/components/Followers/FollowersList.module.scss';
import { useUsers } from 'contexts/UsersContext';

function FollowersList() {
  const { top10Users, currUserFollowList, deleteUserFollow, updateUserFollow } =
    useUsers();

  const handleToggleFollowing = (userId) => {
    const isFollowing = currUserFollowList.some(
      (user) => user.followingId === userId
    );
    if (isFollowing) {
      return deleteUserFollow(userId);
    }

    return updateUserFollow({ id: userId });
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
