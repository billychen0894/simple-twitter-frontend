import { signup, userLogin } from 'api/auth';
import {
  useContext,
  useState,
  useEffect,
  createContext,
  useMemo,
  useCallback,
} from 'react';
import { useLocation } from 'react-router-dom';
import jwt from 'jsonwebtoken';

const calculateRemainingTime = (expirationTime) => {
  const currTime = new Date().getTime();
  const expTime = new Date(expirationTime).getTime();

  const remainingTime = expTime - currTime;

  return remainingTime;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('authToken');
  const storedExpirationTime = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationTime);

  // check if the expirationTime past. If so, then remove token and expirationTime
  if (remainingTime <= 0) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    remainingTime,
  };
};

const defaultAuthContext = {
  isAuthenticated: false,
  role: '',
  currentUser: null,
  register: () => {},
  login: () => {},
  logout: () => {},
};

let logoutTimer;

const AuthContext = createContext(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState(null);
  const [payload, setPayload] = useState(null);
  const { pathname } = useLocation();
  const tokenData = retrieveStoredToken();

  // When URL changes, checks token whether is valid
  useEffect(() => {
    const checkTokenIsValid = async () => {
      if (!tokenData) {
        setIsAuthenticated(false);
        setPayload(null);
        return;
      }

      if (tokenData?.token) {
        const tempPayload = jwt.decode(tokenData?.token);

        setIsAuthenticated(true);
        setPayload(tempPayload);
      } else {
        setIsAuthenticated(false);
        setPayload(null);
      }
    };
    checkTokenIsValid();
  }, [pathname, tokenData]);

  const logoutHandler = useCallback(async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('expirationTime');
    setPayload(null);
    setIsAuthenticated(false);

    // to clear setTimeout timer if user logs out manually
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  // automatically tracks remainingTime when there's user
  useEffect(() => {
    if (tokenData) {
      setTimeout(logoutHandler, tokenData.remainingTime);
    }
  }, [tokenData, logoutHandler]);

  const userLoginHandler = useCallback(
    async (data) => {
      setIsLoading(true);
      const { status, token } = await userLogin({
        account: data.account,
        password: data.password,
      });

      if (status && token) {
        setIsLoading(false);
      }

      const tempPayload = jwt.decode(token);

      // get the expiration time from the decoded payload
      const { exp, user } = tempPayload;

      if (user?.role === 'user') {
        setRole('user');
      }

      // convert the expiration time to Unix timestamp
      const expTimestamp = new Date(exp * 1000).getTime();

      if (tempPayload) {
        setPayload(tempPayload);
        setIsAuthenticated(true);

        localStorage.setItem('authToken', token);
        localStorage.setItem('expirationTime', expTimestamp.toString());
      } else {
        // to log out the user if token is expired and calculate remaining time
        const remainingTime = calculateRemainingTime(expTimestamp);
        logoutTimer = setTimeout(logoutHandler, remainingTime);
        setIsAuthenticated(false);
        setPayload(null);
      }
      return status;
    },
    [logoutHandler, setRole]
  );

  const registerHandler = async (data) => {
    try {
      const response = await signup({
        account: data.account,
        email: data.email,
        name: data.name,
        password: data.password,
        checkPassword: data.checkPassword,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      return response;
    } catch (error) {
      console.error(error);
      return { status: 'error', error: error.message };
    }
  };
  const authContext = useMemo(
    () => ({
      isAuthenticated,
      isLoading,
      role,
      currentUser: payload,
      register: registerHandler,
      userLogin: userLoginHandler,
      logout: logoutHandler,
    }),
    [isAuthenticated, payload, isLoading, userLoginHandler, logoutHandler, role]
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}
