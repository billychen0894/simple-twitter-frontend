import { useLocation } from 'react-router-dom';

import ModalProvider from 'contexts/ModalContentContext';
import TweetModalRoute from 'users/pages/TweetModalRoute';
import EditProfileModalRoute from 'users/pages/EditProfileModalRoute';
import MainRoutes from 'shared/pages/MainRoutes';
import 'styles/global.scss';

function App() {
  const location = useLocation();
  const background = location.state?.background;
  const action = location.state?.action;

  return (
    <ModalProvider>
      {background && action === 'TWEET' && <TweetModalRoute />}
      {background && action === 'EDIT' && <EditProfileModalRoute />}
      <MainRoutes location={background || location} />
    </ModalProvider>
  );
}

export default App;
