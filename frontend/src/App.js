import './App.css';
import {Routes, Route} from 'react-router-dom';
import Landing from './screens/Landing/Landing'
function App() {
  return (
    <div className="App bg-custom-blue-200 w-100 h-100 font-roboto">
      <Routes>
        <Route path="/" exact element={<Landing/>} />
      </Routes>
    </div>
  );
}

export default App;
