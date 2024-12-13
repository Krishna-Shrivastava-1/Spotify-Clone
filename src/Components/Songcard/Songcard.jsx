// import React, { useState, useRef, useEffect } from 'react';
// import songData from '../../Libs/Song.json';
// import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
// import SongController from '../SongController/SongController';

// const Songcard = () => {
//    const [isPlaying, setIsPlaying] = useState(null); // Track the currently playing song ID
//    const [audioSrc, setAudioSrc] = useState(null);  // Store the song URL for SongController
//    const [currentTime, setCurrentTime] = useState(0); // Track the current playback position
//    const [currentSong, setCurrentSong] = useState(null); // Store the currently playing song data
//    const audioRef = useRef(new Audio()); // Create a new Audio object for each instance

//    // Handle play/pause for a song
//    const handlePlayPause = (song, songId) => {
//       const audio = audioRef.current;

//       if (isPlaying === songId) {
//          if (audio.paused) {
//             // Resume playback from the current position
//             audio.play();
//             setIsPlaying(songId);
//          } else {
//             // Pause playback and store the current playback position
//             setCurrentTime(audio.currentTime);
//             audio.pause();
//             setIsPlaying(null);
//          }
//       } else {
//          // Pause the currently playing audio (if any)
//          audio.pause();
//          setCurrentTime(0);
//          audio.src = song.songlink;
//          audio.load();
//          audio.currentTime = currentTime; // Resume from the stored playback position
//          audio.play();
//          setAudioSrc(song.songlink);
//          setIsPlaying(songId);
//          setCurrentSong(song); // Set the current song data
//       }
//    };

//    // Handle audio end event to reset playing state
//    useEffect(() => {
//       const handleAudioEnd = () => {
//          setIsPlaying(null);
//          setCurrentTime(0); // Reset the current time when the audio ends
//          setCurrentSong(null); // Reset the current song data
//       };

//       const audio = audioRef.current;
//       if (audio) {
//          audio.addEventListener('ended', handleAudioEnd);
//          return () => {
//             if (audio) {
//                audio.removeEventListener('ended', handleAudioEnd);
//             }
//          };
//       }
//    }, []);

//    return (
//       <div>
//          <div className='md:flex flex-wrap items-center columns-[300px] justify-around grid grid-cols-2 grid-rows-auto place-items-center'>
//             {songData.map((song) => (
//                <div key={song.id} className='text-white p-2 m-2 font-semibold text-xl relative group w-auto max-w-52 rounded-lg transition-all duration-500 shadow-xl hover:shadow-black hover:bg-zinc-900'>
//                   <img className='rounded-lg w-full' src={song.thumbnail} alt={song.title} />
//                   <p>{song.duration}</p>
//                   <h1>{song.title}</h1>
//                   <hr  className='m-2' />
//                   <h1> By {song.artist}</h1>

//                   {isPlaying === song.id ? (
//                      <FaCirclePause 
//                         onClick={() => handlePlayPause(song, song.id)} 
//                         className='absolute bottom-2/4 right-[20px] text-green-600 text-4xl group-hover:translate-y-[-20px] opacity-0 transition-all duration-500 group-hover:block group-hover:opacity-100 hover:shadow shadow-emerald-600 playshad'
//                      />
//                   ) : (
//                      <FaCirclePlay 
//                         onClick={() => handlePlayPause(song, song.id)} 
//                         className='absolute bottom-2/4 right-[20px] text-green-600 text-4xl group-hover:translate-y-[-20px] opacity-0 transition-all duration-500 group-hover:block group-hover:opacity-100 playshad'
//                      />
//                   )}
//                </div>
//             ))}
//          </div>

//          {/* Audio element for controlling playback */}
//          <audio ref={audioRef} />

//          {/* Song Controller always visible */}
//          <SongController 
//             audioRef={audioRef} 
//             isPlaying={isPlaying !== null} 
//             setIsPlaying={setIsPlaying} 
//             currentSong={currentSong} // Pass current song data
//             onSeekChange={(newTime) => {
//                if (audioRef.current) {
//                   audioRef.current.currentTime = newTime;
//                   setCurrentTime(newTime); // Update the state
//                }
//             }}
//          />
//       </div>
//    );
// };

// export default Songcard;

import React, { useState, useRef, useEffect } from 'react';
import songData from '../../Libs/Song.json';
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import SongController from '../SongController/SongController';
import { useNavigate, useLocation } from 'react-router-dom';

const Songcard = () => {
   const [isPlaying, setIsPlaying] = useState(null); // Track the currently playing song ID
   const [audioSrc, setAudioSrc] = useState(null);  // Store the song URL for SongController
   const [currentTime, setCurrentTime] = useState(0); // Track the current playback position
   const [currentSong, setCurrentSong] = useState(null); // Store the currently playing song data
   const audioRef = useRef(new Audio()); // Create a new Audio object for each instance

   const navigate = useNavigate(); // For navigating to song detail
   const location = useLocation(); // For detecting location changes

   // Handle play/pause for a song
   const handlePlayPause = (song, songId) => {
      const audio = audioRef.current;

      if (isPlaying === songId) {
         if (audio.paused) {
            audio.play();
            setIsPlaying(songId);
         } else {
            setCurrentTime(audio.currentTime);
            audio.pause();
            setIsPlaying(null);
         }
      } else {
         audio.pause();
         setCurrentTime(0);
         audio.src = song.songlink;
         audio.load();
         audio.currentTime = currentTime;
         audio.play();
         setAudioSrc(song.songlink);
         setIsPlaying(songId);
         setCurrentSong(song);
      }
   };

   // Stop audio when the location (route) changes
   useEffect(() => {
      const audio = audioRef.current;
      
      const stopAudioOnRouteChange = () => {
         if (audio && !audio.paused) {
            audio.pause();  // Pause the audio
            audio.currentTime = 0; // Reset playback position
            setIsPlaying(null); // Reset the playing state
            setCurrentSong(null); // Clear the current song data
         }
      };

      // Stop audio whenever the route changes
      stopAudioOnRouteChange(); // Stop immediately when location changes

      // Cleanup effect to stop audio on unmount
      return () => {
         if (audio) {
            audio.pause();
            audio.currentTime = 0; // Reset playback
         }
      };
   }, [location]); // Triggered whenever the location (route) changes

   // Determine if the current route is a song detail page
   const isSongDetailPage = location.pathname.startsWith('/songdetail');

   return (
      <div>
         {/* Render song cards */}
         <div className='md:flex flex-wrap items-center columns-[300px] justify-around grid grid-cols-2 grid-rows-auto place-items-center'>
            {songData.map((song) => (
               <div
                  onClick={() => navigate(`/songdetail/${song.id}`)}
                  key={song.id}
                  className='text-white p-2 m-2 font-semibold text-xl relative group w-auto max-w-52 rounded-lg transition-all duration-500 shadow-xl hover:shadow-black hover:bg-zinc-900 cursor-pointer'
               >
                  <img className='rounded-lg w-full' src={song.thumbnail} alt={song.title} />
                  <p>{song.duration}</p>
                  <h1>{song.title}</h1>
                  <hr className='m-2' />
                  <h1>By {song.artist}</h1>

                  {/* Hide play/pause icons on songdetail page */}
                  {!isSongDetailPage && (
                     isPlaying === song.id ? (
                        <FaCirclePause
                           onClick={(e) => {
                              e.stopPropagation(); // Prevents navigation on button click
                              handlePlayPause(song, song.id);
                           }}
                           className={`absolute bottom-2/4 right-[20px] text-green-600 text-4xl transition-all duration-500 
                                 ${isPlaying === song.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} 
                                 group-hover:translate-y-[-20px] hover:shadow shadow-emerald-600 playshad`}
                        />
                     ) : (
                        <FaCirclePlay
                           onClick={(e) => {
                              e.stopPropagation(); // Prevents navigation on button click
                              handlePlayPause(song, song.id);
                           }}
                           className='absolute bottom-2/4 right-[20px] text-green-600 text-4xl opacity-0 transition-all duration-500 group-hover:translate-y-[-20px] group-hover:opacity-100 playshad'
                        />
                     )
                  )}
               </div>
            ))}
         </div>

         {/* Only show Song Controller if a song is playing */}
         {currentSong && (
            <SongController
               audioRef={audioRef}
               isPlaying={isPlaying !== null}
               setIsPlaying={setIsPlaying}
               currentSong={currentSong}
               onSeekChange={(newTime) => {
                  if (audioRef.current) {
                     audioRef.current.currentTime = newTime;
                     setCurrentTime(newTime);
                  }
               }}
            />
         )}
      </div>
   );
};

export default Songcard;
