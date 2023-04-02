import { getAllUsers, removeUserTweet } from 'api/admin';

const {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} = require('react');

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export function AdminProvider({ children }) {
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const usersData = await getAllUsers();
      setUsersList(usersData);
      setIsLoading(false);
      return usersData;
    } catch (error) {
      setIsLoading(false);
      setUsersList([]);
      return error;
    }
  }, []);

  const deleteUserTweet = useCallback(async (tweetId) => {
    try {
      const result = await removeUserTweet(tweetId);
      return result;
    } catch (error) {
      return error;
    }
  }, []);
  const adminContext = useMemo(() => {
    return {
      fetchAllUsers,
      deleteUserTweet,
      isLoading,
      usersList,
    };
  }, [deleteUserTweet, fetchAllUsers, isLoading, usersList]);
  return (
    <AdminContext.Provider value={adminContext}>
      {children}
    </AdminContext.Provider>
  );
}
