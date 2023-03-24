import { Route, Routes } from 'react-router-dom';

import RootLayout from 'shared/pages/RootLayout';
import Home from 'users/pages/Home';
import 'styles/global.scss';

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
