import { adminLogin, signup, userLogin } from 'api/auth';
import decode from 'jwt-decode';
import {
  useContext,
  useState,
  useEffect,
  createContext,
  useMemo,
  useCallback,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

let logoutTimer;

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [payload, setPayload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const tokenData = retrieveStoredToken();
  let initialToken;

  if (tokenData?.token) {
    initialToken = tokenData.token;
  }
  const [authToken, setAuthToken] = useState(initialToken);

  // When URL changes, checks token whether is valid
  useEffect(() => {
    const checkTokenIsValid = async () => {
      if (!authToken) {
        setIsAuthenticated(false);
        setPayload(null);
        setRole(null);
      }

      if (authToken) {
        const tempPayload = decode(authToken);

        setIsAuthenticated(true);
        setPayload(tempPayload);
        setRole(tempPayload?.role);
      } else {
        setIsAuthenticated(false);
        setPayload(null);
        setRole(null);
      }
    };

    checkTokenIsValid();
  }, [pathname, authToken]);

  const logoutHandler = useCallback(async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('role');
    setPayload(null);
    setIsAuthenticated(false);
    setAuthToken(null);
    setRole(null);
    navigate('/login');

    // to clear setTimeout timer if user logs out manually
    if (logoutTimer) {
      clearTimeout(logoutTimer);
      navigate('/login');
    }
  }, [navigate]);

  // automatically tracks remainingTime when there's user
  useEffect(() => {
    if (tokenData?.remainingTime) {
      setTimeout(logoutHandler, tokenData.remainingTime);
    }
  }, [tokenData, logoutHandler]);

  const userLoginHandler = useCallback(
    async (data) => {
      setIsLoading(true);

      const response = await userLogin({
        account: data.account,
        password: data.password,
      });

      const { status, data: result } = response;

      if (status === 'success') {
        const { token } = result;
        const tempPayload = decode(token);

        // get the expiration time from the decoded payload

        // convert the expiration time to Unix timestamp
        const expTimestamp = new Date(tempPayload.exp * 1000).getTime();

        if (tempPayload?.role === 'user') {
          setRole('user');
        }
        toast.success('登入成功');

        setPayload(tempPayload);
        setIsAuthenticated(true);
        setAuthToken(token);

        localStorage.setItem('authToken', token);
        localStorage.setItem('role', tempPayload?.role);
        localStorage.setItem('expirationTime', expTimestamp.toString());
        navigate('/home', { replace: true });
      } else {
        // to log out the user if token is expired and calculate remaining time
        const storedExpirationTime = localStorage.getItem('expirationTime');
        const remainingTime = calculateRemainingTime(storedExpirationTime);
        logoutTimer = setTimeout(logoutHandler, remainingTime);
        setIsAuthenticated(false);
        setPayload(null);
        setRole(null);
        setAuthToken(null);
      }

      if (status === 'error') {
        toast.error(`${result.message}`);
      }

      setIsLoading(false);
      return response;
    },
    [logoutHandler, navigate]
  );

  const adminLoginHandler = useCallback(
    async (data) => {
      setIsLoading(true);

      const response = await adminLogin({
        account: data.account,
        password: data.password,
      });

      const { status, data: result } = response;

      if (status === 'success') {
        const { token } = result;
        const tempPayload = decode(token);

        // get the expiration time from the decoded payload

        // convert the expiration time to Unix timestamp
        const expTimestamp = new Date(tempPayload.exp * 1000).getTime();

        if (tempPayload?.role === 'admin') {
          setRole('admin');
        }
        toast.success('登入成功!');

        setPayload(tempPayload);
        setIsAuthenticated(true);
        setAuthToken(token);

        localStorage.setItem('authToken', token);
        localStorage.setItem('role', tempPayload?.role);
        localStorage.setItem('expirationTime', expTimestamp.toString());
        navigate('/admin', { replace: true });
      } else {
        // to log out the user if token is expired and calculate remaining time
        const storedExpirationTime = localStorage.getItem('expirationTime');
        const remainingTime = calculateRemainingTime(storedExpirationTime);
        logoutTimer = setTimeout(logoutHandler, remainingTime);
        setIsAuthenticated(false);
        setPayload(null);
        setRole(null);
        setAuthToken(null);
      }

      if (status === 'error') {
        toast.error(`${result.message}`);
      }

      setIsLoading(false);
      return response;
    },
    [logoutHandler, navigate]
  );

  const registerHandler = useCallback(
    async (data) => {
      const response = await signup({
        account: data.account,
        email: data.email,
        name: data.name,
        password: data.password,
        checkPassword: data.checkPassword,
      });

      const { status } = response;

      if (status === 'error') {
        toast.error(response.data.message);
        return response;
      }

      toast.success('註冊成功');
      navigate('login');
      return response;
    },
    [navigate]
  );

  const authContext = useMemo(() => {
    return {
      isAuthenticated,
      role,
      currentUser: payload,
      isLoading,
      register: registerHandler,
      userLogin: userLoginHandler,
      logout: logoutHandler,
      adminLogin: adminLoginHandler,
    };
  }, [
    isAuthenticated,
    payload,
    userLoginHandler,
    adminLoginHandler,
    registerHandler,
    logoutHandler,
    role,
    isLoading,
  ]);

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}
