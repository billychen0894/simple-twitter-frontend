import { Route, Routes, useLocation } from 'react-router-dom';

import RootLayout from 'shared/pages/RootLayout';
import Home from 'users/pages/Home';
import ModalProvider from 'contexts/ModalContentContext';
import TweetModal from 'users/components/TweetModal/TweetModal';
import 'styles/global.scss';

function App() {
  const location = useLocation();
  const background = location.state?.background;
  const action = location.state?.action;

  return (
    <ModalProvider>
      {background && action === 'TWEET' && (
        <Routes>
          <Route path="compose/tweet" element={<TweetModal />} />
        </Routes>
      )}
      {background && action === 'EDIT' && (
        <Routes>
          <Route path="edit_profile" element={<TweetModal />} />
        </Routes>
      )}
      <Routes location={background || location}>
        <Route element={<RootLayout />}>
          <Route path="home/*" element={<Home />}>
            <Route path="compose/tweet" element={<TweetModal />} />
          </Route>
        </Route>
      </Routes>
    </ModalProvider>
  );
}

export default App;
