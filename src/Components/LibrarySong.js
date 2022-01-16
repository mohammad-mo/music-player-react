const LibrarySong = ({ song, songs, setCurrentSong, id, audioRef, isPlaying, setSongs }) => 
{
    const selectSongHandler = async () =>
    {
        await setCurrentSong(song)
        // Add active state
        const newSongs = songs.map(song =>
            {
                if (song.id === id)
                {
                    return {...song, active: true}
                }
                else
                {
                    return {...song, active: false}
                }
            })
        setSongs(newSongs)
        
        // Check if the song is playing
        if (isPlaying) audioRef.current.play()
    }

    return (
        <div onClick={selectSongHandler} className={`library-song ${song.active ? 'selected' : ''}`}>
            <img src={song.cover} alt="Cover of the music" />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}
 
export default LibrarySong