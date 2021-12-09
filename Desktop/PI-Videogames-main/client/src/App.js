import './App.css';
import Home from './componets/home/home';
import GameDetail from './componets/gameDetail/gameDetail'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import { useEffect} from 'react'
import { useDispatch } from "react-redux"
import { fetchVideoGame } from './store/actions';
import LandingPage from './componets/landing/landing';
import GameCreate from './componets/gameCreate/gameCreate';





function App() {
  const dispatch = useDispatch();
  //const allVideogames = useSelector((state) => state.videogames)
  useEffect (() => {
  dispatch(fetchVideoGame() );
  },[dispatch])
  return (
        <BrowserRouter>
        <Routes>
            <Route exact path='/' element={<LandingPage/>}/>
            <Route path='/home' element={<Home/>} />
            <Route exact path='/videogame' element={<GameCreate/>} />
            <Route path='/:id' element={<GameDetail/>} />
        </Routes>
        </BrowserRouter>
  );
}

export default App;
