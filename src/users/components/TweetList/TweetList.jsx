import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { MoonLoader } from 'react-spinners';

import TweetListItem from 'users/components/TweetList/TweetListItem';
import { formattingTime } from 'shared/utils/formattingTime';
import { useUsers } from 'contexts/UsersContext';
import styles from 'users/components/TweetList/TweetList.module.scss';

function TweetList({ listType, followType, currentAccountName, listItems }) {
  let content;

  const { userId } = useParams();
  const {
    userTweets,
    userRepliedTweets,
    userLikes,
    userFollowers,
    userFollowings,
    user,
    fetchUserFollowings,
    fetchUserFollowers,
    fetchUserTweets,
    fetchUserLikes,
    fetchUserRepliedTweets,
    fetchUser,
    isLoading,
  } = useUsers();

  useEffect(() => {
    async function fetchBasedOnType() {
      if (userId) {
        if (listType === 'following') {
          await fetchUserFollowings(userId);
          return;
        }

        if (listType === 'followers') {
          await fetchUserFollowers(userId);
          return;
        }

        if (listType === 'reply') {
          await fetchUserRepliedTweets(userId);
          await fetchUser(userId);
          return;
        }

        if (listType === 'like') {
          await fetchUserLikes(userId);
          return;
        }

        if (listType === 'userTweets') {
          await fetchUserTweets(userId);
        }
      }
    }
    fetchBasedOnType();
  }, [
    listType,
    userId,
    fetchUserFollowings,
    fetchUserFollowers,
    fetchUserRepliedTweets,
    fetchUserLikes,
    fetchUserTweets,
    fetchUser,
  ]);

  if (listType === 'tweetReply' && Array.isArray(listItems)) {
    content = listItems.map((item) => {
      return (
        <TweetListItem
          key={item.id}
          listType={listType}
          content={item?.comment}
          time={formattingTime(item.createdAt)}
          currentUserName={item?.User.name}
          currentAccountName={item?.User.account}
          tweetRepliedUserAccount={currentAccountName}
          userId={item?.UserId}
          tweetRepliedUserAvatar={item?.User.avatar}
        />
      );
    });
  }

  if (listType === 'reply' && Array.isArray(userRepliedTweets)) {
    content = userRepliedTweets.map((item) => {
      return (
        <TweetListItem
          key={item.id}
          listType={listType}
          content={item?.Tweet.description}
          time={formattingTime(item.createdAt)}
          currentUserName={user?.name}
          currentAccountName={user?.account}
          tweetRepliedUserAccount={item?.Tweet.User.account}
          tweetRepliedUserAvatar={user?.avatar}
          userId={user?.id}
        />
      );
    });
  }

  if (
    listType === 'followers' &&
    followType === 'followers' &&
    Array.isArray(userFollowers)
  ) {
    content = userFollowers.map((item) => {
      return (
        <TweetListItem
          key={item.followerId}
          listType={listType}
          content={item?.followerUser.introduction}
          time={formattingTime(item.createdAt)}
          followersName={item?.followerUser.name}
          isFollowing={item?.isFollowing}
          userId={item?.followerId}
          userAvatar={item?.followerUser.avatar}
        />
      );
    });
  }

  if (
    listType === 'following' &&
    followType === 'following' &&
    Array.isArray(userFollowings)
  ) {
    content = userFollowings.map((item) => {
      return (
        <TweetListItem
          key={item.followingId}
          listType={listType}
          content={item?.followingUser.introduction}
          userAvatar={item?.followingUser.avatar}
          followingUserName={item?.followingUser.name}
          isFollowing={item?.isFollowing}
          userId={item?.followingId}
        />
      );
    });
  }

  if (listType === 'like' && Array.isArray(userLikes)) {
    content = userLikes.map((item) => {
      return (
        <TweetListItem
          key={item?.TweetId}
          listType={listType}
          content={item?.Tweet.description}
          commentCount={item?.RepliesCount}
          likeCount={item?.likesCount}
          isUserLiked={item?.isLiked}
          name={item?.Tweet.User.name}
          userAccountName={item?.Tweet.User.account}
          userAvatar={item?.Tweet.User.avatar}
          time={formattingTime(item?.createdAt)}
          userId={item?.Tweet.User.id}
          tweetId={item?.TweetId}
        />
      );
    });
  }

  if (listType === 'userTweets' && Array.isArray(userTweets)) {
    content = userTweets.map((item) => {
      return (
        <TweetListItem
          key={item.id}
          listType={listType}
          content={item?.description}
          commentCount={item?.RepliesCount}
          likeCount={item?.LikesCount}
          name={item?.User.name}
          userAccountName={item?.User.account}
          userAvatar={item?.User.avatar}
          time={formattingTime(item?.createdAt)}
          userId={item?.User.id}
          tweetId={item?.id}
          likes={item?.Likes}
        />
      );
    });
  }

  if (listType === 'homeTweets') {
    content = listItems.map((item) => {
      return (
        <TweetListItem
          key={item.id}
          listType={listType}
          tweetId={item?.id}
          userId={item?.UserId}
          content={item?.description}
          commentCount={item?.Replies.length || 0}
          likes={item?.Likes}
          time={formattingTime(item?.createdAt)}
          name={item?.User.name}
          userAccountName={item?.User.account}
          userAvatar={item?.User.avatar}
        />
      );
    });
  }

  return (
    <article className={styles.tweetList}>
      <MoonLoader
        color="#FF974A"
        loading={isLoading}
        speedMultiplier={1}
        className={styles.spinner}
      />
      {!isLoading ? content : undefined}
    </article>
  );
}

export default TweetList;
