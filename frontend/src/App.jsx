import { BrowserRouter as Router, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import Control from './pages/Control.jsx';

function App() {

  return (
    <>
      <Router>
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/control' element={<Control />} />
		</Routes>
	  </Router>
    </>
  )
}

export default App
