import Avatar from 'shared/components/UIElements/Avatar';
import UserReplyListItem from 'users/components/TweetList/UserReplyListItem';
import OtherUsersTweetsListItem from 'users/components/TweetList/OtherUsersTweetsListItem';
import HomepageTweetListItem from 'users/components/TweetList/HomepageTweetListItem';
import styles from 'users/components/TweetList/TweetListItem.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { memo, useEffect, useMemo, useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { useTweets } from 'contexts/TweetsContext';

const MemoizedAvatar = memo(Avatar);

function TweetListItem({
  listType,
  userId,
  tweetId,
  content,
  commentCount,
  likes,
  time,
  userAvatar,
  name,
  userAccountName,
  currentAccountName,
  currentUserName,
  tweetRepliedUserAccount,
  tweetRepliedUserAvatar,
  followersName,
  followingUserName,
  likeCount,
  isUserLiked,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  // const [isUserFollowing, setIsUserFollowing] = useState(isFollowing);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { fetchReplies } = useTweets();
  const handleTweetReply = () => {
    if (location && location.pathname === '/home') {
      navigate(`/${userId}/reply/${tweetId}`);
      fetchReplies(tweetId);
    }
  };

  const handleNavigateProfile = (e) => {
    e.stopPropagation();
    navigate(`/${userId}`);
  };

  const { currentUser } = useAuth();

  const isCurrentUserLiked = useMemo(() => {
    if (listType === 'like') {
      return isUserLiked;
    }

    if (!likes || !currentUser) return false;

    const likesArr = likes.map((like) => {
      if (like.User_id) {
        return like.User_id;
      }

      return like.UserId;
    });
    return likesArr.includes(currentUser.id);
  }, [likes, currentUser, isUserLiked, listType]);

  const [isToggleLike, setIsToggleLike] = useState(isCurrentUserLiked);

  return (
    <div
      className={styles.container}
      onClick={handleTweetReply}
      role="presentation"
    >
      <MemoizedAvatar
        className={styles.avatar}
        image={userAvatar || tweetRepliedUserAvatar}
        onClick={handleNavigateProfile}
      />
      <div className={styles.tweetListItem}>
        {listType === 'reply' || listType === 'tweetReply' ? (
          <UserReplyListItem
            time={time}
            tweetContent={content}
            currentUserName={currentUserName}
            userAccountName={currentAccountName}
            tweetRepliedUserAccount={tweetRepliedUserAccount}
            onNavigateProfile={handleNavigateProfile}
          />
        ) : undefined}

        {listType === 'followers' ? (
          <OtherUsersTweetsListItem
            tweetContent={content}
            onNavigateProfile={handleNavigateProfile}
            followersName={followersName}
            followingUserName={followingUserName}
            followId={userId}
          />
        ) : undefined}

        {listType === 'following' ? (
          <OtherUsersTweetsListItem
            tweetContent={content}
            onNavigateProfile={handleNavigateProfile}
            followingUserName={followingUserName}
            followId={userId}
          />
        ) : undefined}

        {listType === 'like' ? (
          <HomepageTweetListItem
            time={time}
            tweetContent={content}
            commentCount={commentCount}
            likeCount={likeCount}
            name={name}
            userAccountName={userAccountName}
            onNavigateProfile={handleNavigateProfile}
            userId={userId}
            tweetId={tweetId}
            isLiked={isToggleLike}
            onClickLike={setIsToggleLike}
            listType={listType}
          />
        ) : undefined}

        {listType === 'userTweets' ? (
          <HomepageTweetListItem
            time={time}
            userId={userId}
            tweetContent={content}
            commentCount={commentCount}
            likeCount={likeCount}
            name={name}
            userAccountName={userAccountName}
            onNavigateProfile={handleNavigateProfile}
            listType={listType}
            tweetId={tweetId}
            isLiked={isToggleLike}
            onClickLike={setIsToggleLike}
          />
        ) : undefined}

        {listType === 'homeTweets' ? (
          <HomepageTweetListItem
            tweetId={tweetId}
            userId={userId}
            time={time}
            tweetContent={content}
            commentCount={commentCount}
            likeCount={likes.length}
            isLiked={isToggleLike}
            name={name}
            userAccountName={userAccountName}
            onNavigateProfile={handleNavigateProfile}
            onClickLike={setIsToggleLike}
            listType={listType}
          />
        ) : undefined}
      </div>
    </div>
  );
}

export default TweetListItem;
