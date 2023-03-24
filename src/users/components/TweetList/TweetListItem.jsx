import Avatar from 'shared/components/UIElements/Avatar';
import UserReplyListItem from 'users/components/TweetList/UserReplyListItem';
import OtherUsersTweetsListItem from 'users/components/TweetList/OtherUsersTweetsListItem';
import HomepageTweetListItem from 'users/components/TweetList/HomepageTweetListItem';
import { usersList } from 'constants/constants';
import styles from 'users/components/TweetList/TweetListItem.module.scss';

function TweetListItem({
  listType,
  userId,
  content,
  commentCount,
  likeCount,
  time,
  userToReply,
}) {
  const currUser = 'u1';
  const userInfo = usersList.find((user) => user.userId === userId);
  const inverse = userInfo.followers.includes(currUser);

  return (
    <div className={styles.container}>
      <Avatar className={styles.avatar} image={userInfo.image} />
      <div className={styles.tweetListItem}>
        {listType === 'userReply' ? (
          <UserReplyListItem
            time={time}
            tweetContent={content}
            userToReply={userToReply}
            name={userInfo.name}
            userName={userInfo.userName}
          />
        ) : undefined}

        {listType === 'otherUsersTweets' ? (
          <OtherUsersTweetsListItem
            tweetContent={content}
            name={userInfo.name}
            userName={userInfo.userName}
            inverse={!inverse}
          />
        ) : undefined}

        {listType === 'homeTweets' ? (
          <HomepageTweetListItem
            time={time}
            tweetContent={content}
            commentCount={commentCount}
            likeCount={likeCount}
            name={userInfo.name}
            userName={userInfo.userName}
          />
        ) : undefined}
      </div>
    </div>
  );
}

export default TweetListItem;
