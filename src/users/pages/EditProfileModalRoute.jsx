import { Route, Routes } from 'react-router-dom';
import TweetModal from 'users/components/TweetModal/TweetModal';

function EditProfileModalRoute() {
  return (
    <Routes>
      <Route path="edit_profile" element={<TweetModal />} />
    </Routes>
  );
}

export default EditProfileModalRoute;
