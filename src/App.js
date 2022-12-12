import logo from './logo.svg';
import './App.css';
import {Sidebar,Home,Coins,News,Details} from "./components/index"
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sidebar/>}>
              <Route index element={<Home/>}/>
              <Route path="Coins" element={<Coins/>}/>
              <Route path="News" element={<News/>}/>
          </Route>
              <Route path="/CoinDetails/:id" element={<Details/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
