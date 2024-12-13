
import React, { useEffect, useRef, useState } from 'react';
import logo from '../../assets/logo.png';
import dumprof from '../../assets/dumprof.png';
import { GoHomeFill } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { logout, auth, db } from '../../Config/firebase'; // Make sure to import auth and db from your Firebase config
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import Songdata from '../../Libs/Song.json'
const Navbar = () => {
    const setshownref = useRef(null);
    const navigate = useNavigate();
    const location = useLocation()
    const [showsign, setshowsign] = useState(false);
    const [imageUrl, setImageUrl] = useState(dumprof); // Set default profile image

    useEffect(() => {
        const handleclickoutside = (e) => {
            if (setshownref.current && !setshownref.current.contains(e.target)) {
                setshowsign(false);
            }
        };
        document.addEventListener('mousedown', handleclickoutside);
        return () => {
            document.removeEventListener('mousedown', handleclickoutside);
        };
    }, []);

    // Fetch user profile image from Firestore
    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(userRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setImageUrl(data.profileImage || dumprof); // Set the profile image from Firestore
                    }
                }
            } catch (error) {
                console.error('Error fetching profile image:', error);
            }
        };

        fetchProfileImage();
    }, []);

    const handleLogout = async () => {
        try {
            await logout(); // Firebase logout
            navigate('/');  // Redirect to login page after successful logout
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const handleshowsign = () => {
        setshowsign(!showsign);
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSongs, setFilteredSongs] = useState([]);


    // Function to handle search input
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query) {
            const filtered = Songdata.filter(song =>
                song.title.toLowerCase().includes(query.toLowerCase()) ||
                song.artist.toLowerCase().includes(query.toLowerCase())
            );
            console.log("Filtered Songs: ", filtered); // Debugging line
            setFilteredSongs(filtered);
        } else {
            setFilteredSongs([]);
        }
    };



    console.log(filteredSongs);

    return (
        <div>
            {
                location.pathname === '/' ?
                    <div className='navbar w-full h-auto flex items-center justify-center bg-black p-2'>
                        <div className="logo w-12 flex justify-center items-center">
                            <img className='w-full' src={logo} alt="Logo" />
                            <h1 className='text-white font-semibold text-2xl'>SpotMus</h1>
                        </div>
                    </div>
                    :
                    <div className='navbar w-full h-auto flex items-center justify-between bg-black p-2'>
                        <div className="logo w-12 flex items-center">
                            <img className='w-full' src={logo} alt="Logo" />
                            <h1 className='text-white font-semibold text-2xl'>SpotMus</h1>
                        </div>
                        {
                            location.pathname === '/searchpage' ?
                                <div className='flex items-center justify-center gap-x-3 w-full'>
                                    <div className="searchout flex items-center justify-center w-full">
                                        <GoHomeFill onClick={() => navigate('/home')} className='text-4xl text-white p-2 rounded-full bg-stone-900 cursor-pointer hover:scale-105 m-1' />
                                        {
                                            location.pathname === '/searchpage' ?
                                                null :
                                                <IoIosSearch className='text-zinc-400 text-2xl group-focus-within:text-white group-hover:text-white flex md:hidden' onClick={() => navigate('/searchpage')} />
                                        }

                                        {
                                            location.pathname === '/searchpage' ?

                                                <div className='searchbar flex items-center justify-center border-transparent focus-within:border-white border-2 rounded-full bg-zinc-800 p-1 px-2 group cursor-pointer w-full ' >

                                                    <IoIosSearch className='text-zinc-400 text-xl group-focus-within:text-white group-hover:text-white' />
                                                    <input type="search" placeholder='What do you want to play?' className='rounded-full w-full bg-transparent outline-none border-none text-white text-lg placeholder:font-semibold placeholder-zinc-400 p-1 cursor-pointer ' value={searchQuery} onChange={handleSearch} />

                                                </div>
                                                :
                                                <div className='searchbar relative  items-center justify-center border-transparent  p-2 px-2 focus-within:border-white border-2 rounded-full bg-zinc-800  group cursor-pointer hidden md:flex ' >

                                                    <IoIosSearch className='text-zinc-400 text-2xl group-focus-within:text-white group-hover:text-white ' />
                                                    <input value={searchQuery} onChange={handleSearch} type="search" placeholder='What do you want to play?' className='rounded-full min-w-[275px] hidden md:block w-auto bg-transparent outline-none border-none text-white text-lg placeholder:font-semibold placeholder-zinc-400 p-1 cursor-pointer ' />



                                                    {searchQuery && (
                                                        <div className='search-results bg-black absolute top-full right-0 rounded-lg w-full mt-2 max-h-64 overflow-y-auto z-50'>
                                                            {filteredSongs.length > 0 ? (
                                                                filteredSongs.map((song, index) => (
                                                                    <div key={index} className="search-result-item p-2 hover:bg-gray-200 cursor-pointer">
                                                                        <p className="text-white font-semibold">{song.title} - {song.artist}</p>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <p className="text-white p-2">No results found</p>
                                                            )}
                                                        </div>
                                                    )}


                                                </div>
                                        }

                                    </div>

                                    <div className="expprem bg-white rounded-full cursor-pointer">
                                        <p className='text-black text-lg font-semibold hover:scale-105 transition-all duration-200 whitespace-nowrap md:block hidden p-1 px-4 '>Explore Premium</p>
                                    </div>
                                    <div>
                                        <div className='relative'>
                                            {/* Display profile image */}
                                            <div className='w-8'>
                                                <img onClick={handleshowsign} className='w-full cursor-pointer rounded-full' src={imageUrl} alt="Profile" />
                                            </div>

                                            {
                                                showsign && (
                                                    <div ref={setshownref} className='absolute md:bottom-[-85px] bottom-[-115px] md:left-[-70px] left-[-150px] bg-zinc-800 p-2 px-3 rounded-lg w-auto shadow-black shadow-lg'>
                                                        <div className="account">
                                                            <h1 onClick={() => navigate('/profile')} className='rounded-lg px-1 hover:bg-zinc-700 text-white font-semibold text-lg cursor-pointer'>Profile</h1>
                                                            <h1 onClick={handleLogout} className='rounded-lg px-1 hover:bg-zinc-700 text-white font-semibold text-lg cursor-pointer'>Signout</h1>
                                                            <h1 onClick={handleLogout} className='rounded-lg px-1 hover:bg-zinc-700 text-white font-semibold text-lg cursor-pointer whitespace-nowrap md:hidden'>Explore Premium</h1>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                :

                                <div className='flex items-center justify-center gap-x-3 '>
                                    <div className="searchout flex items-center justify-center ">
                                        <GoHomeFill onClick={() => navigate('/home')} className='text-4xl text-white p-2 rounded-full bg-stone-900 cursor-pointer hover:scale-105 m-1' />
                                        {
                                            location.pathname === '/searchpage' ?
                                                null :
                                                <IoIosSearch className='text-zinc-400 text-2xl group-focus-within:text-white group-hover:text-white flex md:hidden' onClick={() => navigate('/searchpage')} />
                                        }

                                        {
                                            location.pathname === '/searchpage' ?

                                                <div className='searchbar flex items-center justify-center border-transparent focus-within:border-white border-2 rounded-full bg-zinc-800 p-1 px-2 group cursor-pointer w-full ' >

                                                    <IoIosSearch className='text-zinc-400 text-xl group-focus-within:text-white group-hover:text-white' />
                                                    <input type="search" placeholder='What do you want to play?' className='rounded-full w-full bg-transparent outline-none border-none text-white text-lg placeholder:font-semibold placeholder-zinc-400 p-1 cursor-pointer ' />
                                                </div>
                                                :
                                                <div className='searchbar  items-center justify-center border-transparent  p-2 px-2 focus-within:border-white border-2 rounded-full bg-zinc-800  group cursor-pointer hidden md:flex ' >

                                                    <IoIosSearch className='text-zinc-400 text-2xl group-focus-within:text-white group-hover:text-white ' />
                                                    <input type="search" placeholder='What do you want to play?' className='rounded-full min-w-[275px] hidden md:block w-auto bg-transparent outline-none border-none text-white text-lg placeholder:font-semibold placeholder-zinc-400 p-1 cursor-pointer ' />
                                                </div>
                                        }

                                    </div>
                                    <div className="expprem bg-white rounded-full cursor-pointer">
                                        <p className='text-black text-lg font-semibold hover:scale-105 transition-all duration-200 whitespace-nowrap md:block hidden p-1 px-4 '>Explore Premium</p>
                                    </div>
                                    <div>
                                        <div className='relative'>
                                            {/* Display profile image */}
                                            <div className='w-8'>
                                                <img onClick={handleshowsign} className='w-full cursor-pointer rounded-full' src={imageUrl} alt="Profile" />
                                            </div>

                                            {
                                                showsign && (
                                                    <div ref={setshownref} className='absolute md:bottom-[-85px] bottom-[-115px] md:left-[-70px] left-[-150px] bg-zinc-800 p-2 px-3 rounded-lg w-auto shadow-black shadow-lg'>
                                                        <div className="account">
                                                            <h1 onClick={() => navigate('/profile')} className='rounded-lg px-1 hover:bg-zinc-700 text-white font-semibold text-lg cursor-pointer'>Profile</h1>
                                                            <h1 onClick={handleLogout} className='rounded-lg px-1 hover:bg-zinc-700 text-white font-semibold text-lg cursor-pointer'>Signout</h1>
                                                            <h1 onClick={handleLogout} className='rounded-lg px-1 hover:bg-zinc-700 text-white font-semibold text-lg cursor-pointer whitespace-nowrap md:hidden'>Explore Premium</h1>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>

            }




        </div>
    );
};

export default Navbar;


