import { Outlet, useLocation, useMatch } from 'react-router-dom';

import ProfileNavBar from 'userProfile/componenets/ProfileNavbar';
import TweetHeader from 'users/components/TweetHeader/TweetHeader';
import UserProfileHeader from 'userProfile/componenets/UserProfileHeader';
import styles from 'userProfile/pages/UserProfile.module.scss';
import { usersList } from 'constants/constants';

function UserProfile() {
  const matchTweet = useMatch('/:userId');
  const matchReply = useMatch('/:userId/reply');
  const matchLike = useMatch('/:userId/like');
  const matchFollowing = useMatch('/:userId/following');
  const matchFollowers = useMatch('/:userId/followers');
  const location = useLocation();

  const [userInfo] = usersList.filter((user) => user.userId === 'u1');

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
      label: '推文與回覆',
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
      <TweetHeader userProfileHeader label="John Doe" info="25 推文" />

      {selectedNavItem && !selectedNavItem.path.startsWith('follow') ? (
        <UserProfileHeader userInfo={userInfo} userId="u1" />
      ) : undefined}

      <ProfileNavBar
        navItemDetails={navItems}
        userId="u1"
        className={styles.tweetNavBar}
      />
      <Outlet />
    </div>
  );
}

export default UserProfile;
