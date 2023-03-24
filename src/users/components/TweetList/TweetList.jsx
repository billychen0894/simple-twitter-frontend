import TweetListItem from 'users/components/TweetList/TweetListItem';
import styles from 'users/components/TweetList/TweetList.module.scss';

function TweetList({ listType, listItems, tweetUserName }) {
  const content = listItems.map((item) => {
    return (
      <TweetListItem
        key={item.userId}
        listType={listType}
        userId={item.userId}
        content={item.content || item.replyContent}
        commentCount={item.commentCount}
        likeCount={item.likeCount}
        time={item.createdAt}
        userToReply={tweetUserName}
      />
    );
  });

  return <article className={styles.tweetList}>{content}</article>;
}

export default TweetList;
