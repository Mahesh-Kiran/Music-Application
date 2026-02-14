import react from "react";
import Navbar from "./Components/Navbar";
import Home from './Pages/Home';
import Playlist from "./Pages/Playlist";
import Songs from "./Pages/Songs";
import { useState } from "react";
import {Routes,Route} from "react-router-dom";

function App(){
  const [playlist, setPlaylist] = useState([]);

  const addToPlaylist = (song) => {
    setPlaylist(prev => [...prev, song]);
  };

  return(
    <div>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/songs" element={ <Songs addToPlaylist={addToPlaylist}/>}/>
        <Route path="/playlist" element={<Playlist playlist={playlist}/>}/>
      </Routes>
    </div>
  );
}

export default App;