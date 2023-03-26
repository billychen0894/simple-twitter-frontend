import { Route, Routes } from 'react-router-dom';
import TweetModal from 'users/components/TweetModal/TweetModal';

function TweetModalRoute() {
  return (
    <Routes>
      <Route path="compose/tweet" element={<TweetModal />} />
    </Routes>
  );
}

export default TweetModalRoute;
