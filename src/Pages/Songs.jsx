import SongCard from "../Components/SongCard";
import songs from "../songs.json";
import { useEffect, useState } from "react";

function Songs({ addToPlaylist }){
    const [add,setAdd] = useState({});
    useEffect(()=>{console.log("playlist updated")},[add]);

    const toggleAdd = (song) => {
        setAdd(prev => ({...prev,[song.id]:!prev[song.id]}));
        addToPlaylist(song);
    };

    return(
        <>
        <h1>Songs</h1>
            {
                songs.map((song)=> (
                <div key={song.id}>
                    <SongCard song={song} isAdded={true} />
                    <button onClick={()=>toggleAdd(song)}>{add[song.id] ? "Added to Playlist☑️":"Add to Playlist✔️"}</button>
                </div>
                ))
            }
        </>
    );
}

export default Songs;