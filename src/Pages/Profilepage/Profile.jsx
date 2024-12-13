

// import React, { useState, useEffect } from 'react';
// import profdump from '../../assets/dumprof.png';
// import { storage, db, auth, logout } from '../../Config/firebase';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { doc, getDoc, setDoc } from 'firebase/firestore';
// import Navbar from '../../Components/Navbar/Navbar,';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';



// const Profile = ({ fullname, setfullname, useremail }) => {
//     const [image, setImage] = useState(null); // For storing selected image
//     const [imageUrl, setImageUrl] = useState(profdump); // Default profile image
//     const [name, setName] = useState(''); // For storing user name
//     const [loading, setLoading] = useState(false);
//     const [useremd, setuseremd] = useState('')
// const navigate = useNavigate()
//     // Fetch user profile data (image and name) from Firestore on component mount
//     useEffect(() => {

//         const fetchProfileData = async () => {
//             try {
//                 const user = auth.currentUser;
//                 if (user) {
//                     const userRef = doc(db, 'users', user.uid);
//                     const docSnap = await getDoc(userRef);

//                     if (docSnap.exists()) {
//                         const data = docSnap.data();
//                         setImageUrl(data.profileImage || profdump);
//                         setName(data.name || fullname); // Set the user name from Firestore
//                     }
//                 }
//             } catch (error) {
//                 console.error('Error fetching profile data:', error);
//             }
//         };

//         fetchProfileData();
//     }, []);

//     // Handle image file selection
//     const handleFileChange = (e) => {
//         if (e.target.files[0]) {
//             setImage(e.target.files[0]);
//         }
//     };

//     // Handle name change
//     const handleNameChange = (e) => {
//         setName(e.target.value);
//         setfullname(e.target.value)
//     };

//     // Handle profile update (image and name)
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const user = auth.currentUser;
//             if (user) {
//                 let uploadedImageUrl = imageUrl; // Default to the existing image URL

//                 // Upload the image if it's selected
//                 if (image) {
//                     const imageRef = ref(storage, `profiles/${user.uid}/profile.jpg`);
//                     await uploadBytes(imageRef, image);
//                     uploadedImageUrl = await getDownloadURL(imageRef); // Get the image URL from Firebase Storage
//                     setImageUrl(uploadedImageUrl); // Update local image URL state
//                 }

//                 // Update the user's profile information in Firestore
//                 const userRef = doc(db, 'users', user.uid);
//                 await setDoc(userRef, { profileImage: uploadedImageUrl, name }, { merge: true });

//                 toast.success('Profile updated successfully!', { theme: 'dark' })
//             }
//         } catch (error) {
//             console.error('Error updating profile:', error);
//         } finally {
//             setLoading(false);
//         }
//     };
// const handlelogout = async ()=>{
//     try {
//           await logout()  
//           navigate('/')
//     } catch (error) {
//         console.log(error)
//     }


// }
//     return (
//         <div>
//             {/* Pass the updated imageUrl to the Navbar */}
//             <Navbar imageurl={imageUrl} />

//             <div className='flex items-center justify-center'>
//                 <form className='shadow-emerald-800 shadow-xl p-2 rounded-lg border-gray-700 border-2' onSubmit={handleSubmit}>
//                     <div className='flex flex-col items-center justify-center'>
//                         <label htmlFor="avatar">
//                             <input
//                                 type="file"
//                                 id='avatar'
//                                 accept='.png ,.jpeg ,.jpg'
//                                 hidden
//                                 onChange={handleFileChange}
//                             />
//                             <img className='w-32 cursor-pointer rounded-full' src={imageUrl} alt="Profile" />
//                         </label>
//                         {/* <input
//                             type="text"
//                             value={name}
//                             onChange={handleNameChange}
//                             placeholder="Enter your name"
//                             className='text-black p-2 rounded mt-2'
//                         /> */}
//                         <div className='flex items-center justify-center relative m-2'>
//                             <h1 className='text-white text-sm mx-2 absolute top-[-5px] bg-neutral-800 left-0'>Name</h1>  <input onChange={handleNameChange} value={name} className='text-white outline-none rounded-md outline-gray-600 focus-within:outline-none   focus:bg-zinc-800 my-2 bg-transparent placeholder:text-zinc-600 text-xl p-2 focus-within:border-2 border-white px-4' type="text" placeholder='Edit Name' required />
//                         </div>
//                         <div className='flex items-center justify-center relative m-2'>
//                             <h1 className='text-white text-sm mx-2 absolute top-[-5px] bg-neutral-800 left-0'>Logged EmailID</h1> <input value={useremail} className='text-white outline-none rounded-md outline-gray-600   my-2 bg-transparent text-xl p-2 cursor-not-allowed  px-4 ' type="text" readOnly />
//                         </div>

//                         <button
//                             className='text-white border-none outline-none bg-green-700 rounded-xl p-2 m-2 hover:bg-green-800 transition-all duration-200 w-full'
//                             type='submit'
//                             disabled={loading}
//                         >
//                             {loading ? 'Saving...' : 'Save Changes'}
//                         </button>
//                     </div>
//                     <div className='m-3'>
//                         <h2 className='text-white text-lg'>Do you want to SignOut? <span onClick={handlelogout} className='bg-red-600 text-white hover:bg-red-800 cursor-pointer select-none transition-all duration-300 rounded-md text-lg p-1' >Signout Now</span></h2>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Profile;




import React, { useState, useEffect } from 'react';
import profdump from '../../assets/dumprof.png';
import { storage, db, auth, logout } from '../../Config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Navbar from '../../Components/Navbar/Navbar,';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Profile = ({ fullname, setfullname, useremail }) => {
    const [image, setImage] = useState(null); // For storing selected image
    const [imageUrl, setImageUrl] = useState(profdump); // Default profile image
    const [name, setName] = useState(fullname); // For storing user name
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch user profile data (image and name) from Firestore on component mount or refresh
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(userRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setImageUrl(data.profileImage || profdump);
                        const fetchedName = data.name || fullname;
                        setName(fetchedName); // Set the user name from Firestore
                        setfullname(fetchedName); // Update parent component with the fetched name
                    }
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, [fullname, setfullname]); // Add dependencies

    // Handle image file selection
    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    // Handle name change
    const handleNameChange = (e) => {
        const updatedName = e.target.value;
        setName(updatedName);
        setfullname(updatedName); // Update parent component
    };

    // Handle profile update (image and name)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const user = auth.currentUser;
            if (user) {
                let uploadedImageUrl = imageUrl; // Default to the existing image URL

                // Upload the image if it's selected
                if (image) {
                    const imageRef = ref(storage, `profiles/${user.uid}/profile.jpg`);
                    await uploadBytes(imageRef, image);
                    uploadedImageUrl = await getDownloadURL(imageRef); // Get the image URL from Firebase Storage
                    setImageUrl(uploadedImageUrl); // Update local image URL state
                }

                // Update the user's profile information in Firestore
                const userRef = doc(db, 'users', user.uid);
                await setDoc(userRef, { profileImage: uploadedImageUrl, name }, { merge: true });

                toast.success('Profile updated successfully!', { theme: 'dark' });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {/* Pass the updated imageUrl to the Navbar */}
            <Navbar imageUrl={imageUrl} />

            <div className='flex items-center justify-center'>
                <form className='shadow-emerald-800 shadow-xl p-2 rounded-lg border-gray-700 border-2' onSubmit={handleSubmit}>
                    <div className='flex flex-col items-center justify-center'>
                        <label htmlFor="avatar">
                            <input
                                type="file"
                                id='avatar'
                                accept='.png ,.jpeg ,.jpg'
                                hidden
                                onChange={handleFileChange}
                            />
                            <img className='w-32 cursor-pointer rounded-full' src={imageUrl} alt="Profile" />
                        </label>

                        <div className='flex items-center justify-center relative m-2'>
                            <h1 className='text-white text-sm mx-2 absolute top-[-5px] bg-neutral-800 left-0'>Name</h1>  
                            <input 
                                onChange={handleNameChange} 
                                value={name} 
                                className='text-white outline-none rounded-md outline-gray-600 focus-within:outline-none cursor-not-allowed select-none focus:bg-zinc-800 my-2 bg-transparent placeholder:text-zinc-600 text-xl p-2 focus-within:border-2 border-white px-4' 
                                type="text" 
                                placeholder='Sorry the edited name will show only here'  readOnly
                                 
                            />
                        </div>
                        <div className='flex items-center justify-center relative m-2'>
                            <h1 className='text-white text-sm mx-2 absolute top-[-5px] bg-neutral-800 left-0'>Logged EmailID</h1> 
                            <input 
                                value={useremail} 
                                className='text-white outline-none rounded-md outline-gray-600 my-2 bg-transparent text-xl p-2 cursor-not-allowed px-4' 
                                type="text" 
                                readOnly 
                            />
                        </div>

                        <button
                            className='text-white border-none outline-none bg-green-700 rounded-xl p-2 m-2 hover:bg-green-800 transition-all duration-200 w-full'
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                    <div className='m-3'>
                        <h2 className='text-white text-lg'>Do you want to SignOut? 
                            <span onClick={handleLogout} className='bg-red-600 text-white hover:bg-red-800 cursor-pointer select-none transition-all duration-300 rounded-md text-lg p-1'>
                                Signout Now
                            </span>
                        </h2>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
