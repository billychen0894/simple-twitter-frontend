import AdminUserCardItem from 'admin/AdminUserCard/AdminUserCardItem';
// import Card from 'shared/components/UIElements/Card';
import styles from 'admin/AdminUserCard/AdminUserCardList.module.scss';

function AdminUserCardList({ cardItems }) {
  const adminUserCardList = cardItems.map((cardItem) => {
    return (
      <AdminUserCardItem
        key={cardItem.id}
        name={cardItem.name}
        userName={cardItem.userName}
        commentCount={cardItem.commentCount}
        likeCount={cardItem.likeCount}
        followingCount={cardItem.followingCount}
        followerCount={cardItem.followerCount}
        avatar={cardItem.avatar}
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
