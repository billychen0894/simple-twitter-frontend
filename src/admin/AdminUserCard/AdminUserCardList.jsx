import AdminUserCardItem from 'admin/AdminUserCard/AdminUserCardItem';
import styles from 'admin/AdminUserCard/AdminUserCardList.module.scss';

function AdminUserCardList({ cardItems }) {
  const adminUserCardList = cardItems.map((cardItem) => {
    return (
      <AdminUserCardItem
        key={cardItem?.id}
        name={cardItem?.name}
        userAccountName={cardItem?.account}
        tweetsCount={cardItem?.TweetsCount}
        likeCount={cardItem?.LikesCount}
        followingCount={cardItem?.FollowingsCount}
        followerCount={cardItem?.FollowersCount}
        avatar={cardItem?.avatar}
        coverImage={cardItem?.coverImage}
      />
    );
  });
  return (
    <div className={styles.AdminCards}>
      <div className={styles.cardContainer}>{adminUserCardList}</div>
    </div>
  );
}
export default AdminUserCardList;
