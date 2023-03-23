import Card from 'shared/components/UIElements/Card';
import FollowersListItem from 'shared/components/Followers/FollowersListItem';
import styles from 'shared/components/Followers/FollowersList.module.scss';

function FollowersList() {
  return (
    <div className={styles.followers}>
      <Card className={styles.followersListContainer}>
        <h2>推薦跟隨</h2>
        <hr />
        <div>
          <ul>
            <FollowersListItem following />
            <FollowersListItem following />
            <FollowersListItem />
            <FollowersListItem />
            <FollowersListItem />
            <FollowersListItem />
          </ul>
        </div>
      </Card>
    </div>
  );
}
export default FollowersList;
