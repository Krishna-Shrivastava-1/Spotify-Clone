


import React, { useState, useEffect, useRef } from 'react';
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { FaVolumeHigh } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
const SongController = ({ audioRef, isPlaying, setIsPlaying, currentSong, onSeekChange }) => {
   const [volume, setVolume] = useState(1); // Volume state
   const [progress, setProgress] = useState(0); // Progress state
   const [duration, setDuration] = useState(0); // Duration state
   const volumeRef = useRef(null); // Ref for the volume slider

   useEffect(() => {
      const audio = audioRef.current;

      if (audio) {
         const updateProgress = () => {
            setProgress(audio.currentTime);
            setDuration(audio.duration);
         };

         audio.addEventListener('timeupdate', updateProgress);
         audio.addEventListener('loadedmetadata', updateProgress);

         return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('loadedmetadata', updateProgress);
         };
      }
   }, [audioRef]);

   useEffect(() => {
      const audio = audioRef.current;

      if (audio) {
         audio.volume = volume;
      }
   }, [volume]);

   const handlePlayPause = () => {
      const audio = audioRef.current;

      if (audio) {
         if (isPlaying) {
            audio.pause();
            setIsPlaying(null);
         } else {
            audio.play().catch(err => console.log(err));
            setIsPlaying(true);
         }
      }
   };

   const handleSeek = (e) => {
      const newTime = e.target.value;
      if (audioRef.current) {
         onSeekChange(newTime); // Call the onSeekChange function from props
         setProgress(newTime);
      }
   };

   const handleVolumeWheel = (e) => {
      e.preventDefault();
      const step = 0.05; // Adjust this to control sensitivity
      if (e.deltaY < 0 && volume < 1) {
         setVolume((prevVolume) => Math.min(prevVolume + step, 1)); // Increase volume
      } else if (e.deltaY > 0 && volume > 0) {
         setVolume((prevVolume) => Math.max(prevVolume - step, 0)); // Decrease volume
      }
   };

   useEffect(() => {
      const volumeSlider = volumeRef.current;
      if (volumeSlider) {
         volumeSlider.addEventListener('wheel', handleVolumeWheel);
      }

      // Cleanup event listener on unmount
      return () => {
         if (volumeSlider) {
            volumeSlider.removeEventListener('wheel', handleVolumeWheel);
         }
      };
   }, [volume]);

   // Time formatting function
   const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Formats to mm:ss
   };
const navigate = useNavigate()
   return (
      <div className='song-controller sticky z-40 bottom-0 left-0 right-0 bg-black text-white p-1 px-3 flex justify-between flex-wrap  md:flex-nowrap items-center'>
         {currentSong && (
            <div onClick={()=> navigate(`/songdetail/${currentSong.id}`) } className=' cursor-pointer current-song-info flex items-center mb-4'>
               <img src={currentSong.thumbnail} alt={currentSong.title} className='w-16 h-16 rounded-md mr-4' />
               <div className='hover:underline hover:underline-offset-8'>
                  <h2 className='text-xl'>{currentSong.title}</h2>
                  <p>{currentSong.artist}</p>
               </div>
            </div>
         )}

         <div className='flex items-center flex-wrap md:flex-nowrap w-full justify-left'>



            <div className='mx-4 w-full flex flex-nowrap items-center justify-center gap-3'>
               <div className="play-pause">
                  {isPlaying ? (
                     <FaCirclePause className="text-white text-4xl cursor-pointer" onClick={handlePlayPause} />
                  ) : (
                     <FaCirclePlay className="text-white text-4xl cursor-pointer" onClick={handlePlayPause} />
                  )}
               </div>

               <input
                  type="range"
                  id="seek"
                  min="0"
                  max={duration}
                  value={progress}
                  onChange={handleSeek}
                  style={{
                     background: `linear-gradient(to right, #1db954 ${(progress / duration) * 100}%, #ddd ${(progress / duration) * 100}%)`
                  }}
               />
               <div className='mt-2 whitespace-nowrap'>
                  <span>{formatTime(progress)} / {formatTime(duration)}</span>
               </div>
            </div>

            <div className='flex items-center gap-3 text-2xl justify-center ml-4 my-3' >
               <label htmlFor="volume"><FaVolumeHigh /></label>
               <input
                  type="range"
                  id="volume"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  ref={volumeRef}
                  style={{
                     background: `linear-gradient(to right, #0EEC5D ${volume * 100}%, #ddd ${volume * 100}%)`
                  }}
               />

            </div>


         </div>

      </div>
   );
};

export default SongController;
