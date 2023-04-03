import decode from 'jwt-decode';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  getUser,
  getUserTweets,
  getUserRepliedTweets,
  getUserLikes,
  getUserFollowers,
  getUserFollowings,
  updateUser,
  updateUserSettings,
  getTop10Users,
} from 'api/users';
import { followUser, unFollowUser } from 'api/followships';

const UsersContext = createContext();

export const useUsers = () => useContext(UsersContext);

export function UsersProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userTweets, setUserTweets] = useState([]);
  const [userRepliedTweets, setUserRepliedTweets] = useState([]);
  const [userLikes, setUserLikes] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);
  const [userFollowings, setUserFollowings] = useState([]);
  const [top10Users, setTop10Users] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUser = useCallback(async (userId) => {
    setIsLoading(true);
    const userData = await getUser(userId);
    setUser(userData);
    setIsLoading(false);
    return userData;
  }, []);

  const fetchUserTweets = useCallback(async (userId) => {
    setIsLoading(true);
    const tweets = await getUserTweets(userId);
    setUserTweets(tweets);
    setIsLoading(false);
  }, []);

  const fetchUserRepliedTweets = useCallback(async (userId) => {
    setIsLoading(true);
    const repliedTweets = await getUserRepliedTweets(userId);
    setUserRepliedTweets(repliedTweets);
    setIsLoading(false);
  }, []);

  const fetchUserLikes = useCallback(async (userId) => {
    setIsLoading(true);
    const likes = await getUserLikes(userId);
    setUserLikes(likes);
    setIsLoading(false);
  }, []);

  const fetchUserFollowers = useCallback(async (userId) => {
    setIsLoading(true);
    const followers = await getUserFollowers(userId);

    if (Array.isArray(followers) && followers.length > 0) {
      setUserFollowers(followers);
      setIsLoading(false);
      return followers;
    }
    setUserFollowers([]);
    setIsLoading(false);
    return followers;
  }, []);

  const fetchUserFollowings = useCallback(async (userId) => {
    try {
      setIsLoading(true);
      const followings = await getUserFollowings(userId);

      if (Array.isArray(followings) && followings.length > 0) {
        setUserFollowings(followings);
        setIsLoading(false);
        return followings;
      }

      setUserFollowings([]);
      setIsLoading(false);
      return [];
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      return { error: 'The user does not have any followings' };
    }
  }, []);

  const [currUserFollowList, setCurrUserFollowList] = useState([]);
  useEffect(() => {
    async function loadCurrentUserFollowingList() {
      const authToken = localStorage.getItem('authToken');
      const userData = authToken ? decode(authToken) : null;
      const result = await fetchUserFollowings(userData?.id);

      if (!result || result.length === 0) {
        return;
      }

      setCurrUserFollowList(result);
    }
    loadCurrentUserFollowingList();
  }, [fetchUserFollowings]);

  const updateUserProfile = useCallback(
    async (payload) => {
      try {
        const updatedUser = await updateUser(user.id, payload);
        if (updatedUser.userUpdated) {
          const {
            name,
            introduction,
            avatar,
            cover_image: coverImage,
          } = updatedUser.userUpdated;

          setUser({
            ...user,
            name,
            introduction,
            avatar,
            cover_image: coverImage,
          });
        }
        return {
          success: true,
          data: updatedUser,
        };
      } catch (error) {
        return {
          success: false,
          error: error.response,
        };
      }
    },
    [user]
  );

  const updateUserSettingsContext = useCallback(
    async (payload) => {
      try {
        const updatedSettings = await updateUserSettings(user.id, payload);
        if (updatedSettings.userUpdated) {
          const { account, name, email } = updatedSettings.userUpdated;

          setUser({
            ...user,
            account,
            name,
            email,
          });
        }
        return {
          success: true,
          data: updatedSettings,
        };
      } catch (error) {
        return {
          success: false,
          error: error.response,
        };
      }
    },
    [user]
  );

  const fetchTop10Users = useCallback(async () => {
    try {
      const data = await getTop10Users();

      if (data) {
        const { users } = data;
        setTop10Users(users);
        return {
          success: true,
          data: users,
        };
      }

      setTop10Users([]);
      return {
        success: true,
        data: [],
      };
    } catch (error) {
      return {
        success: false,
        error: error.response,
      };
    }
  }, []);

  const updateUserFollow = useCallback(
    async (payload, pathUserId) => {
      try {
        const result = await followUser(payload);

        if (result && result.isFollowedUser) {
          const authToken = localStorage.getItem('authToken');
          const userData = authToken ? decode(authToken) : null;
          const updatedCurrUserFollowList = await fetchUserFollowings(
            userData?.id
          );

          setCurrUserFollowList(updatedCurrUserFollowList);

          if (+pathUserId === payload.id) {
            await fetchUserFollowings(payload.id);
            await fetchUserFollowers(payload.id);
          } else {
            await fetchUserFollowers(userData?.id);
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    [fetchUserFollowings, fetchUserFollowers]
  );

  const deleteUserFollow = useCallback(
    async (id, pathUserId) => {
      try {
        const result = await unFollowUser(id);

        if (result && result.removedFollowingUser) {
          const authToken = localStorage.getItem('authToken');
          const userData = authToken ? decode(authToken) : null;
          const updatedCurrUserFollowList = await fetchUserFollowings(
            userData?.id
          );

          setCurrUserFollowList(updatedCurrUserFollowList);

          if (+pathUserId === id) {
            await fetchUserFollowings(id);
            await fetchUserFollowers(id);
          } else {
            await fetchUserFollowers(userData?.id);
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    [fetchUserFollowings, fetchUserFollowers]
  );

  const userContext = useMemo(() => {
    return {
      user,
      userTweets,
      userRepliedTweets,
      userLikes,
      userFollowers,
      userFollowings,
      fetchUser,
      fetchUserTweets,
      fetchUserRepliedTweets,
      fetchUserLikes,
      fetchUserFollowers,
      fetchUserFollowings,
      updateUserProfile,
      updateUserSettings: updateUserSettingsContext,
      isLoading,
      top10Users,
      currUserFollowList,
      updateUserFollow,
      deleteUserFollow,
      fetchTop10Users,
      setUser,
    };
  }, [
    user,
    userTweets,
    userRepliedTweets,
    userLikes,
    userFollowers,
    userFollowings,
    fetchUser,
    fetchUserTweets,
    fetchUserRepliedTweets,
    fetchUserLikes,
    fetchUserFollowers,
    fetchUserFollowings,
    updateUserProfile,
    updateUserSettingsContext,
    isLoading,
    top10Users,
    currUserFollowList,
    updateUserFollow,
    deleteUserFollow,
    fetchTop10Users,
    setUser,
  ]);
  return (
    <UsersContext.Provider value={userContext}>
      {children}
    </UsersContext.Provider>
  );
}
