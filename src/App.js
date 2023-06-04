import { Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Layout from './layout/Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/about' exact element={<About />} />
      </Routes>
    </Layout>
  );
}

export default App;
