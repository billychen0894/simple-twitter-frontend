import { Route, Routes } from 'react-router-dom';
import RootLayout from 'shared/pages/RootLayout';
import 'styles/global.scss';

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />} />
    </Routes>
  );
}

export default App;
