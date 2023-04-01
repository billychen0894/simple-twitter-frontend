import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import decode from 'jwt-decode';

import sendRequest from 'api/utils';

const TweetsContext = createContext();

export const useTweets = () => useContext(TweetsContext);

export function TweetsProvider({ children }) {
  const [currentTweet, setCurrentTweet] = useState(null);
  const [replies, setReplies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [hasNewTweet, setHasNewTweet] = useState(false);

  const authToken = localStorage.getItem('authToken');

  const fetchTweets = useCallback(async () => {
    try {
      setIsLoading(true);
      const cachedTweets = sessionStorage.getItem('tweets');

      if (cachedTweets && hasNewTweet) {
        const parsedCachedTweets = JSON.parse(cachedTweets);

        if (JSON.stringify(parsedCachedTweets) !== JSON.stringify(tweets)) {
          const response = await sendRequest('/tweets');
          setTweets(response);
          setHasNewTweet(false);
          sessionStorage.setItem('tweets', JSON.stringify(response));
          setIsLoading(false);
        }
      } else {
        const response = await sendRequest('/tweets');

        setTweets(response);
        setHasNewTweet(false);
        sessionStorage.setItem('tweets', JSON.stringify(response));
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(error);
    }
  }, [tweets, hasNewTweet]);

  useEffect(() => {
    if (hasNewTweet) {
      fetchTweets();
    }
  }, [fetchTweets, hasNewTweet]);

  const createTweet = useCallback(
    async (newTweet) => {
      try {
        if (!authToken) {
          return;
        }

        const response = await sendRequest('/tweets', 'POST', newTweet);

        if (response && authToken) {
          const { name, account, avatar } = decode(authToken);
          const newCreatedTweet = {
            ...response,
            User: { name, account, avatar },
            Replies: [],
            Likes: [],
          };

          setTweets((prevTweets) => [...prevTweets, newCreatedTweet]);
          setHasNewTweet(true);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [authToken, setHasNewTweet]
  );

  const [isCurrentTweetLoading, setIsCurrentTweetLoading] = useState(false);
  const fetchTweet = useCallback(async (tweetId) => {
    try {
      setIsCurrentTweetLoading(true);
      const response = await sendRequest(`/tweets/${tweetId}`);

      setCurrentTweet(response);
      setIsCurrentTweetLoading(false);
      return response;
    } catch (error) {
      console.error(error);
      setIsCurrentTweetLoading(false);
      return error;
    }
  }, []);

  const createReply = useCallback(
    async (tweetId, newReply) => {
      try {
        if (!authToken) {
          return;
        }

        const { name, account } = decode(authToken);

        const response = await sendRequest(
          `/tweets/${tweetId}/replies`,
          'POST',
          newReply
        );

        const updatedTweetIndex = tweets.findIndex(
          (tweet) => tweet.id === +response.TweetId
        );

        if (updatedTweetIndex !== -1) {
          const updatedTweet = {
            ...tweets[updatedTweetIndex],
            Replies: [
              ...tweets[updatedTweetIndex].Replies,
              { User_id: response.UserId, createdAt: response.createdAt },
            ],
          };
          const updatedTweets = [...tweets];
          updatedTweets[updatedTweetIndex] = updatedTweet;
          setTweets(updatedTweets);
        }

        setReplies([...replies, { ...response, User: { name, account } }]);
      } catch (error) {
        console.error(error);
      }
    },
    [replies, tweets, authToken]
  );

  const fetchReplies = useCallback(async (tweetId) => {
    try {
      setIsLoading(true);
      const response = await sendRequest(`/tweets/${tweetId}/replies`);
      setReplies(response);
      setIsLoading(false);
      return response;
    } catch (error) {
      setReplies([]);
      setIsLoading(false);
      return error;
    }
  }, []);

  const likeTweet = useCallback(
    async (tweetId) => {
      try {
        if (!authToken) {
          return;
        }

        const { id } = decode(authToken);

        await sendRequest(`/tweets/${tweetId}/like`, 'POST');

        const updatedTweetIndex = tweets.findIndex(
          (tweet) => tweet.id === tweetId
        );

        const now = new Date();
        const formattedDate = now.toISOString();

        if (updatedTweetIndex !== -1) {
          const updatedTweet = {
            ...tweets[updatedTweetIndex],
            Likes: [
              ...tweets[updatedTweetIndex].Likes,
              { User_id: id, createdAt: formattedDate },
            ],
          };
          const updatedTweets = [...tweets];
          updatedTweets[updatedTweetIndex] = updatedTweet;
          setTweets(updatedTweets);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [authToken, tweets]
  );

  const unlikeTweet = useCallback(
    async (tweetId) => {
      try {
        if (!authToken) {
          return;
        }

        const { id } = decode(authToken);
        await sendRequest(`/tweets/${tweetId}/unlike`, 'POST');

        const updatedTweetIndex = tweets.findIndex(
          (tweet) => tweet.id === tweetId
        );

        if (updatedTweetIndex !== -1) {
          const updatedTweetLikes = tweets[updatedTweetIndex].Likes.filter(
            (like) => like.User_id !== id
          );
          const updatedTweet = {
            ...tweets[updatedTweetIndex],
            Likes: updatedTweetLikes,
          };
          const updatedTweets = [...tweets];
          updatedTweets[updatedTweetIndex] = updatedTweet;
          setTweets(updatedTweets);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [authToken, tweets]
  );

  const tweetsContext = useMemo(() => {
    return {
      isLoading,
      isError,
      tweets,
      currentTweet,
      replies,
      createTweet,
      fetchTweets,
      fetchTweet,
      createReply,
      fetchReplies,
      likeTweet,
      unlikeTweet,
      hasNewTweet,
      setCurrentTweet,
      isCurrentTweetLoading,
    };
  }, [
    isLoading,
    isError,
    tweets,
    currentTweet,
    replies,
    hasNewTweet,
    createReply,
    createTweet,
    fetchReplies,
    fetchTweets,
    fetchTweet,
    likeTweet,
    unlikeTweet,
    setCurrentTweet,
    isCurrentTweetLoading,
  ]);

  return (
    <TweetsContext.Provider value={tweetsContext}>
      {children}
    </TweetsContext.Provider>
  );
}
