function SongCard({song}){
    return(
        <>
            <div key={song.id}>
            <h2 >{song.name}</h2>
            <p>{song.artist}</p>
            <p>{song.duration}</p>
            </div>
        </>
    );
}

export default SongCard;