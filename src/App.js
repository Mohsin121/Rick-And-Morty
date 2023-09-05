import react from 'react'
import List from './pages/List';
import Details from './pages/Details';

import { Route, Routes } from 'react-router-dom';


function App() {
  return (
  //   <div className="App">
  //   <List/>
  // </div>

  <>
  <Routes>
  <Route path='/' element={<List/>}/>
  <Route path='details/:id' element={<Details/>}/>

  </Routes>
  </>
  );
}

export default App;
