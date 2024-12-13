// import React, { useState, useEffect, useRef } from 'react';
// import { FaCirclePause, FaCirclePlay, FaVolumeHigh } from "react-icons/fa6";
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import songdata from '../../Libs/Song.json'; // Import song data
// import { LuShare } from "react-icons/lu";
// import CommentSection from '../../Components/Comment/CommentSection'
// const Songdetail = () => {
//     const { idsong } = useParams(); // Get song ID from URL
//     const [songdetail, setSongdetail] = useState(null);
//     const [isPlaying, setIsPlaying] = useState(false); // State for tracking play/pause
//     const [volume, setVolume] = useState(1); // Volume state
//     const [progress, setProgress] = useState(0); // Progress state
//     const [duration, setDuration] = useState(0); // Duration state
//     const audioRef = useRef(null); // Ref for audio element
//     const volumeRef = useRef(null); // Ref for the volume slider
//     const navigate = useNavigate();

//     useEffect(() => {
//         const foundSong = songdata.find((song) => song.id === parseInt(idsong));
//         if (foundSong) {
//             setSongdetail(foundSong);
//         }
//     }, [idsong]);

//     useEffect(() => {
//         const audio = audioRef.current;

//         const updateProgress = () => {
//             if (audio) {
//                 setProgress(audio.currentTime);
//                 setDuration(audio.duration);
//             }
//         };

//         if (audio) {
//             audio.addEventListener('loadedmetadata', updateProgress);
//             audio.addEventListener('timeupdate', updateProgress);

//             return () => {
//                 audio.removeEventListener('loadedmetadata', updateProgress);
//                 audio.removeEventListener('timeupdate', updateProgress);
//             };
//         }
//     }, [audioRef.current]);

//     useEffect(() => {
//         if (audioRef.current) {
//             audioRef.current.volume = volume;
//         }
//     }, [volume]);

//     const handlePlayPause = () => {
//         const audio = audioRef.current;
//         if (audio) {
//             if (isPlaying) {
//                 audio.pause();
//                 setIsPlaying(false);
//             } else {
//                 audio.play().catch(err => console.log(err));
//                 setIsPlaying(true);
//             }
//         }
//     };

//     const handleSeek = (e) => {
//         const newTime = parseFloat(e.target.value);
//         if (audioRef.current) {
//             audioRef.current.currentTime = newTime;
//             setProgress(newTime);
//         }
//     };

//     const handleVolumeChange = (e) => {
//         setVolume(parseFloat(e.target.value));
//     };

//     const handleVolumeWheel = (e) => {
//         e.preventDefault();
//         const step = 0.02; // Adjust this to control sensitivity
//         setVolume((prevVolume) => {
//             let newVolume = prevVolume + (e.deltaY < 0 ? step : -step);
//             newVolume = Math.max(0, Math.min(newVolume, 1)); // Clamp between 0 and 1
//             return newVolume;
//         });
//     };

//     const handleMouseEnter = () => {
//         const volumeSlider = volumeRef.current;
//         if (volumeSlider) {
//             volumeSlider.addEventListener('wheel', handleVolumeWheel);
//         }
//     };

//     const handleMouseLeave = () => {
//         const volumeSlider = volumeRef.current;
//         if (volumeSlider) {
//             volumeSlider.removeEventListener('wheel', handleVolumeWheel);
//         }
//     };

//     useEffect(() => {
//         const volumeSlider = volumeRef.current;
//         if (volumeSlider) {
//             volumeSlider.addEventListener('wheel', handleVolumeWheel);

//             return () => {
//                 volumeSlider.removeEventListener('wheel', handleVolumeWheel);
//             };
//         }
//     }, [volume]);

//     const formatTime = (time) => {
//         const minutes = Math.floor(time / 60);
//         const seconds = Math.floor(time % 60);
//         return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//     };

//     const handleShare = () => {
//         if (navigator.share) {
//             navigator.share({
//                 title: songdetail.title,
//                 text: `Check out this song: ${songdetail.title} by ${songdetail.artist}`,
//                 url: `/songdetail/${songdetail.id}`
//             }).catch(err => console.error('Error sharing:', err));
//         } else {
//             alert('Share functionality is not supported on this device.');
//         }
//     };

//     if (!songdetail) {
//         return <p>Song not found.</p>;
//     }
// const location = useLocation()
// const pathname = location.pathname;
// const id = pathname.split('/').pop(); // Extracting the ID from the pathname

// // Determine the class based on the ID
// const getClassNames = () => {
//     switch (id) {
//         case '1':
//             return 'scar'; // Tailwind CSS class for red text
//         case '2':
//             return 'fairy'; // Tailwind CSS class for blue text
//         case '3':
//             return 'capta'; // Tailwind CSS class for blue text
//         case '4':
//             return 'imdrag'; // Tailwind CSS class for blue text
//         case '5':
//             return 'moon'; // Tailwind CSS class for blue text
//         case '6':
//             return 'idio'; // Tailwind CSS class for blue text
//         case '7':
//             return 'sparr'; // Tailwind CSS class for blue text
//         case '8':
//             return 'hakku'; // Tailwind CSS class for blue text
//         default:
//             return 'text-white'; // Default class
//     }
// };
//     return (
//         <div  className={`text-white flex md:flex-nowrap flex-wrap ${getClassNames()}`}>

//             <div className='flex flex-wrap items-start justify-around  w-full md:w-[70%]'>
//                 <div className='w-[28%] p-2'>
//                     <img src={songdetail.thumbnail} alt={songdetail.title} className='w-full  rounded-lg mb-4' />
//                 </div>
//                 <div className='w-[72%] p-2 flex flex-col justify-around'>
//                     <h1 className='text-3xl font-bold mb-2'>{songdetail.title}</h1>
//                     <p className='text-xl mb-2'>Artist: {songdetail.artist}</p>
//                     <p className='text-md mb-4'>Duration: {formatTime(duration)}</p>
//                     <div className='flex items-center justify-left'>
//                         <button
//                             onClick={handlePlayPause}
//                             className='text-green-600 text-4xl playshad transition-all duration-500 p-2 rounded-lg'
//                         >
//                             {isPlaying ? <FaCirclePause /> : <FaCirclePlay />}

//                         </button>
//                         <button
//                             onClick={handleShare}
//                             className='mt-4 text-blue-500 text-3xl flex items-center gap-2 mb-4' 
//                         >
//                             <LuShare />
//                         </button>
//                     </div>
//                 </div>



//                 <div className='flex items-center flex-wrap w-full justify-center mt-4'>
//                     <div className='flex items-center mx-4 w-full'>
//                         <input
//                             type="range"
//                             min="0"
//                             max={duration}
//                             value={progress}
//                             onChange={handleSeek}
//                             className='w-full mx-2'
//                             style={{
//                                 background: `linear-gradient(to right, #1db954 ${(progress / duration) * 100}%, #ddd ${(progress / duration) * 100}%)`
//                             }}
//                         />
//                         <div className='text-white whitespace-nowrap'>
//                             <span>{formatTime(progress)} / {formatTime(duration)}</span>
//                         </div>
//                     </div>

//                     <div
//                         className='flex items-center gap-3 text-2xl'
//                         onMouseEnter={handleMouseEnter}
//                         onMouseLeave={handleMouseLeave}
//                     >
//                         <FaVolumeHigh />
//                         <input
//                             type="range"
//                             min="0"
//                             max="1"
//                             step="0.01"
//                             value={volume}
//                             onChange={handleVolumeChange}
//                             ref={volumeRef}
//                             className='w-32 mx-2'
//                             style={{
//                                 background: `linear-gradient(to right, #0EEC5D ${volume * 100}%, #ddd ${volume * 100}%)`
//                             }}
//                         />
//                     </div>
//                 </div>



//                 <audio ref={audioRef} src={songdetail.songlink} />
//             </div>
//             <div className=' w-full md:w-[30%]  p-3 bg-zinc-900 h-auto'>
//                 <CommentSection/>
//             </div>
//         </div>
//     );
// };

// export default Songdetail;




import React, { useState, useEffect, useRef } from 'react';
import { FaCirclePause, FaCirclePlay, FaVolumeHigh } from "react-icons/fa6";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import songdata from '../../Libs/Song.json'; // Import song data
import { FaShareSquare } from "react-icons/fa";
import CommentSection from '../../Components/Comment/CommentSection';
import Navbar from '../../Components/Navbar/Navbar,';
import Songcard from '../../Components/Songcard/Songcard'
import Footer from '../../Components/Footer/Footer';

import {
    WhatsappShareButton,
    FacebookShareButton,
    TwitterShareButton,
    WhatsappIcon,
    FacebookIcon
} from 'react-share';
import twitxicon from '../../assets/twitxicon.png'
const Songdetail = () => {
    const { idsong } = useParams(); // Get song ID from URL
    const [songdetail, setSongdetail] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false); // State for tracking play/pause
    const [volume, setVolume] = useState(1); // Volume state
    const [progress, setProgress] = useState(0); // Progress state
    const [duration, setDuration] = useState(0); // Duration state
    const audioRef = useRef(null); // Ref for audio element
    const volumeRef = useRef(null); // Ref for the volume slider
    const navigate = useNavigate();

    useEffect(() => {
        const foundSong = songdata.find((song) => song.id === parseInt(idsong));
        if (foundSong) {
            setSongdetail(foundSong);
        }
    }, [idsong]);

    useEffect(() => {
        const audio = audioRef.current;

        const updateProgress = () => {
            if (audio) {
                setProgress(audio.currentTime);
                setDuration(audio.duration);
            }
        };

        if (audio) {
            audio.addEventListener('loadedmetadata', updateProgress);
            audio.addEventListener('timeupdate', updateProgress);

            return () => {
                audio.removeEventListener('loadedmetadata', updateProgress);
                audio.removeEventListener('timeupdate', updateProgress);
            };
        }
    }, [audioRef.current]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const handlePlayPause = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.pause();
                setIsPlaying(false);
            } else {
                audio.play().catch(err => console.log(err));
                setIsPlaying(true);
            }
        }
    };

    const handleSeek = (e) => {
        const newTime = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
            setProgress(newTime);
        }
    };

    const handleVolumeChange = (e) => {
        setVolume(parseFloat(e.target.value));
    };

    const handleVolumeWheel = (e) => {
        e.preventDefault();
        const step = 0.02; // Adjust this to control sensitivity
        setVolume((prevVolume) => {
            let newVolume = prevVolume + (e.deltaY < 0 ? step : -step);
            newVolume = Math.max(0, Math.min(newVolume, 1)); // Clamp between 0 and 1
            return newVolume;
        });
    };

    const handleMouseEnter = () => {
        const volumeSlider = volumeRef.current;
        if (volumeSlider) {
            volumeSlider.addEventListener('wheel', handleVolumeWheel);
        }
    };

    const handleMouseLeave = () => {
        const volumeSlider = volumeRef.current;
        if (volumeSlider) {
            volumeSlider.removeEventListener('wheel', handleVolumeWheel);
        }
    };

    useEffect(() => {
        const volumeSlider = volumeRef.current;
        if (volumeSlider) {
            volumeSlider.addEventListener('wheel', handleVolumeWheel);

            return () => {
                volumeSlider.removeEventListener('wheel', handleVolumeWheel);
            };
        }
    }, [volume]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: songdetail.title,
                text: `Check out this song: ${songdetail.title} by ${songdetail.artist}`,
                url: `/songdetail/${songdetail.id}`
            }).catch(err => console.error('Error sharing:', err));
        } else {
            alert('Share functionality is not supported on this device.');
        }
    };

    if (!songdetail) {
        return <p>Song not found.</p>;
    }
    const location = useLocation()
    const pathname = location.pathname;
    const id = pathname.split('/').pop();
    const getClassNames = () => {
        switch (id) {
            case '1':
                return 'scar'; // Tailwind CSS class for red text
            case '2':
                return 'fairy'; // Tailwind CSS class for blue text
            case '3':
                return 'capta'; // Tailwind CSS class for blue text
            case '4':
                return 'imdrag'; // Tailwind CSS class for blue text
            case '5':
                return 'moon'; // Tailwind CSS class for blue text
            case '6':
                return 'idio'; // Tailwind CSS class for blue text
            case '7':
                return 'sparr'; // Tailwind CSS class for blue text
            case '8':
                return 'hakku'; // Tailwind CSS class for blue text
            case '9':
                return 'ganda'; // Tailwind CSS class for blue text
            case '11':
                return 'vida'; // Tailwind CSS class for blue text
            case '10':
                return 'bile'; // Tailwind CSS class for blue text
            default:
                return 'text-white'; // Default class
        }
    };


    return (
        <div>
            <div className='z-50 sticky top-0 '>
                <Navbar />
            </div>
            <div className={`text-white flex md:flex-nowrap flex-wrap h-auto  ${getClassNames()}`}>
                <div className='flex flex-wrap items-start justify-around  w-full md:w-[70%]'>
                    <div className='md:w-[28%] p-2 w-[80%] '>
                        <img src={songdetail.thumbnail} alt={songdetail.title} className='w-full rounded-lg mb-4' />
                    </div>
                    <div className='md:w-[72%] w-full p-2 flex flex-col justify-around'>
                        <h1 className='text-3xl font-bold mb-2'>{songdetail.title}</h1>
                        <p className='text-xl mb-2'>Artist: {songdetail.artist}</p>
                        <p className='text-md mb-4'>Duration: {songdetail.duration}</p>
                        <div className='flex items-center justify-left gap-3'>
                            <button
                                onClick={handlePlayPause}
                                className='text-green-600 text-4xl playshad transition-all duration-500 p-2 rounded-lg'
                            >
                                {isPlaying ? <FaCirclePause /> : <FaCirclePlay />}
                            </button>
                            <button

                                className='mt-4 text-blue-600 text-3xl flex items-center gap-2 mb-4 '
                            >
                                <FacebookShareButton url={window.location.origin + `/songdetail/${songdetail.id}`} title={`#SpotMus a Song for you: ${songdetail.title}`}>
                                    <FacebookIcon size={32} round />
                                </FacebookShareButton>
                            </button>
                            <button

                                className='mt-4 text-black text-3xl flex items-center gap-2 mb-4'
                            >
                                <TwitterShareButton url={window.location.origin + `/songdetail/${songdetail.id}`} title={`#SpotMus a Song for you: ${songdetail.title}`}>
                                    <img src={twitxicon} className='w-8' alt="" />
                                </TwitterShareButton>
                            </button>
                            <button

                                className='mt-4 text-green-500 text-3xl flex items-center gap-2 mb-4'
                            >
                                <WhatsappShareButton url={window.location.origin + `/songdetail/${songdetail.id}`} title={`#SpotMus a Song for you: ${songdetail.title}`}>
                                    <WhatsappIcon size={32} round />
                                </WhatsappShareButton>

                            </button>
                            <button
                                onClick={handleShare}
                                className='mt-4 text-white text-2xl flex items-center gap-2 mb-4'
                            >
                                <FaShareSquare />
                            </button>
                        </div>
                        <div className='flex items-center flex-wrap w-full justify-center mt-4'>
                            <div className='flex items-center mx-4 w-full'>
                                <input
                                    type="range"
                                    min="0"
                                    max={duration}
                                    value={progress}
                                    onChange={handleSeek}
                                    className='w-full mx-2'
                                    style={{
                                        background: `linear-gradient(to right, #1db954 ${(progress / duration) * 100}%, #ddd ${(progress / duration) * 100}%)`
                                    }}
                                />
                                <div className='text-white whitespace-nowrap'>
                                    <span>{formatTime(progress)} / {formatTime(duration)}</span>
                                </div>
                            </div>
                            <div
                                className='flex items-center gap-3 text-2xl'
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <FaVolumeHigh />
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    ref={volumeRef}
                                    className='w-32 mx-2'
                                    style={{
                                        background: `linear-gradient(to right, #0EEC5D ${volume * 100}%, #ddd ${volume * 100}%)`
                                    }}
                                />
                            </div>
                        </div>
                        <div className='w-full md:w-[30%] md:hidden block p-3 bg-zinc-900 h-auto  '>
                            <CommentSection songId={idsong} />
                        </div>
                    </div>
                    <div>
                        <h1 className='text-white font-extrabold p-3 text-2xl' >More Songs</h1>
                        <Songcard />
                    </div>
                    <audio ref={audioRef} src={songdetail.songlink} />
                </div>
                <div className='w-full md:w-[30%] hidden md:block p-3 bg-zinc-900 h-auto sticky z-20 bottom-0 left-0 md:static '>
                    <CommentSection songId={idsong} />
                </div>

            </div>
            <div className='bg-transparent'>
                <Footer />
            </div>
        </div>
    );
};

export default Songdetail;

