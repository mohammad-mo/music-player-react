import React, { useState, useRef } from 'react'

// Import styles
import './Styles/app.scss'

// Adding components
import Player from './Components/Player'
import Song from './Components/Song'
import Library from './Components/Library'
import Nav from './Components/Nav'

// Import util
import data from './data'

const App = () =>
{
  
  // Ref
  const audioRef = useRef(null)

  // State
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0
  })
  const [libraryStatus, setLibraryStatus] = useState(false)
  
  const timeUpdateHandler = (e) =>
  {
      const currentTime = e.target.currentTime
      const duration = e.target.duration
      // Calculate percentage
      const roundedCurrent = Math.round(currentTime)
      const roundedDuration = Math.round(duration)
      const animationPercentage = Math.round((roundedCurrent / roundedDuration) * 100)
      setSongInfo({ ...setSongInfo, currentTime, duration, animationPercentage })
  }

  const songEndHandler = async () =>
  {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id)
    await setCurrentSong(songs[(currentIndex + 1) % songs.length])

    if (isPlaying) audioRef.current.play()
  }

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        audioRef={audioRef}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setSongs={setSongs}
        songs={songs}
        setSongs={setSongs}
      />
      <Library 
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <audio 
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef} 
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  )
}

export default App
