import { Outlet, useLocation, useMatch, useParams } from 'react-router-dom';

import ProfileNavBar from 'userProfile/componenets/ProfileNavbar';
import TweetHeader from 'users/components/TweetHeader/TweetHeader';
import UserProfileHeader from 'userProfile/componenets/UserProfileHeader';
import styles from 'userProfile/pages/UserProfile.module.scss';
import { useEffect } from 'react';
import { useUsers } from 'contexts/UsersContext';

function UserProfile() {
  const matchTweet = useMatch('/:userId');
  const matchReply = useMatch('/:userId/reply');
  const matchLike = useMatch('/:userId/like');
  const matchFollowing = useMatch('/:userId/following');
  const matchFollowers = useMatch('/:userId/followers');
  const location = useLocation();
  const { userId } = useParams();

  const { fetchUser, user } = useUsers();

  useEffect(() => {
    fetchUser(userId);
  }, [userId, fetchUser]);

  const navItems = [
    {
      id: crypto.randomUUID(),
      path: '',
      label: '推文',
      match: matchTweet,
    },
    {
      id: crypto.randomUUID(),
      path: 'reply',
      label: '回覆',
      match: matchReply,
    },
    {
      id: crypto.randomUUID(),
      path: 'like',
      label: '喜歡的內容',
      match: matchLike,
    },
    {
      id: crypto.randomUUID(),
      path: 'followers',
      label: '跟隨者',
      match: matchFollowers,
    },
    {
      id: crypto.randomUUID(),
      path: 'following',
      label: '正在跟隨',
      match: matchFollowing,
    },
  ].filter((item) => {
    if (matchFollowing || matchFollowers) {
      return item.path === 'followers' || item.path === 'following';
    }
    return item.path === '' || item.path === 'reply' || item.path === 'like';
  });

  const selectedNavItem = navItems.find((item) =>
    location.pathname.endsWith(item.path)
  );

  return (
    <div className={styles.tweet}>
      <TweetHeader
        userProfileHeader
        label={user?.name}
        info={`${user?.Tweets.length} 推文`}
      />

      {selectedNavItem && !selectedNavItem.path.startsWith('follow') ? (
        <UserProfileHeader />
      ) : undefined}

      <ProfileNavBar
        navItemDetails={navItems}
        userId={userId}
        className={styles.tweetNavBar}
      />
      <Outlet />
    </div>
  );
}

export default UserProfile;
