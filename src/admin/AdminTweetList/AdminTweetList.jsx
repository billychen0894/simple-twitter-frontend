import styles from 'admin/AdminTweetList/AdminTweetList.module.scss';
import AdminTweetListItem from 'admin/AdminTweetList/AdminTweetListItem';

function AdminTweetList({ listItems }) {
  const AdminContent = listItems.map((item) => {
    return (
      <AdminTweetListItem
        key={item.userId}
        userId={item.userId}
        tweetId={item.tweetId}
        name={item.name}
        userName={item.userName}
        content={item.content || item.replyContent}
        time={item.createdAt}
      />
    );
  });
  return (
    <div className={styles.AdminTweets}>
      <article className={styles.adminTweetListContainer}>
        {AdminContent}
      </article>
    </div>
  );
}

export default AdminTweetList;
