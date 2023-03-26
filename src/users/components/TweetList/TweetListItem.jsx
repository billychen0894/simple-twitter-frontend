import Avatar from 'shared/components/UIElements/Avatar';
import UserReplyListItem from 'users/components/TweetList/UserReplyListItem';
import OtherUsersTweetsListItem from 'users/components/TweetList/OtherUsersTweetsListItem';
import HomepageTweetListItem from 'users/components/TweetList/HomepageTweetListItem';
import { usersList } from 'constants/constants';
import styles from 'users/components/TweetList/TweetListItem.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const tweetId = 't1';
  const userInfo = usersList.find((user) => user.userId === userId);
  const inverse = userInfo.followers.includes(currUser);
  const location = useLocation();
  const navigate = useNavigate();

  const handleTweetReply = () => {
    if (location && location.pathname === '/home') {
      navigate(`/${userId}/reply/${tweetId}`);
    }
  };

  const handleNavigateProfile = (e) => {
    e.stopPropagation();
    navigate(`/${userId}`);
  };

  return (
    <div
      className={styles.container}
      onClick={handleTweetReply}
      role="presentation"
    >
      <Avatar
        className={styles.avatar}
        image={userInfo.image}
        onClick={handleNavigateProfile}
      />
      <div className={styles.tweetListItem}>
        {listType === 'userReply' ? (
          <UserReplyListItem
            time={time}
            tweetContent={content}
            userToReply={userToReply}
            name={userInfo.name}
            username={userInfo.username}
            onNavigateProfile={handleNavigateProfile}
          />
        ) : undefined}

        {listType === 'otherUsersTweets' ? (
          <OtherUsersTweetsListItem
            tweetContent={content}
            name={userInfo.name}
            username={userInfo.username}
            inverse={!inverse}
            onNavigateProfile={handleNavigateProfile}
          />
        ) : undefined}

        {listType === 'homeTweets' ? (
          <HomepageTweetListItem
            time={time}
            tweetContent={content}
            commentCount={commentCount}
            likeCount={likeCount}
            name={userInfo.name}
            username={userInfo.username}
            onNavigateProfile={handleNavigateProfile}
          />
        ) : undefined}
      </div>
    </div>
  );
}

export default TweetListItem;
