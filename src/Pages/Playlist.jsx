function Playlist({playlist}){
    return(
        <>
            <h1>My PlayList</h1>
            {playlist.length === 0 && <p>No songs added</p>}
            {playlist.map(song => (
                <p key={song.id}>
                {song.name} - {song.artist} - {song.duration}
                </p>
            ))}
        </>
    );
}

export default Playlist;