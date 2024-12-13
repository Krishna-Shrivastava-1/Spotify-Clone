import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../Config/firebase'; // Import the Firestore database
import dumprof from '../../assets/dumprof.png';
import { FaLocationArrow } from "react-icons/fa6";

const CommentSection = ({ songId }) => {
    const [comment, setComment] = useState(''); // For holding the user's comment input
    const [comments, setComments] = useState([]); // For storing all comments fetched from Firestore
    const [username, setUsername] = useState(''); // For storing the name of the current user
    const [profileImage, setProfileImage] = useState(''); // For storing the profile image of the current user

    // Fetch the logged-in user's name and profile image from Firestore when the component mounts
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    // Fetch the user data from Firestore
                    const userRef = doc(db, 'users', user.uid); // Ensure 'users' collection has user data
                    const userSnap = await getDoc(userRef);
                    
                    if (userSnap.exists()) {
                        setUsername(userSnap.data().username || 'Anonymous'); // Use 'username' field from Firestore
                        setProfileImage(userSnap.data().profileImage || dumprof); // Fetch the profile image, fallback to default if not available
                    } else {
                        console.log("User profile not found in Firestore.");
                    }
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile(); // Call when component mounts
    }, []); // This will fetch the user profile when the component is loaded

    // Fetch comments for the specific song when the component mounts
    useEffect(() => {
        const fetchComments = async () => {
            const commentsQuery = query(collection(db, 'comments'), where('songId', '==', songId)); // Query comments for the specific song
            const querySnapshot = await getDocs(commentsQuery);
            const commentsData = querySnapshot.docs.map(doc => doc.data());

            // Sort comments by timestamp in descending order
            const sortedComments = commentsData.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
            setComments(sortedComments);
        };

        fetchComments();
    }, [songId]);

    // Handle comment submission
    const handleCommentSubmit = async (e) => {
        e.preventDefault(); // Prevent form refresh
        if (comment.trim()) { // Check if the comment is not empty
            try {
                await addDoc(collection(db, 'comments'), {
                    songId: songId,
                    text: comment,
                    name: username || 'Anonymous', // Use the fetched username, fallback to 'Anonymous'
                    profileImage: profileImage || dumprof, // Add the profile image to the comment
                    timestamp: new Date()
                });

                setComment(''); // Clear the input field

                // Fetch updated comments after submission
                const commentsQuery = query(collection(db, 'comments'), where('songId', '==', songId));
                const querySnapshot = await getDocs(commentsQuery);
                const commentsData = querySnapshot.docs.map(doc => doc.data());

                // Sort comments by timestamp in descending order
                const sortedComments = commentsData.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
                setComments(sortedComments);
            } catch (error) {
                console.error('Error submitting comment:', error);
            }
        }
    };

    // Handle keydown event
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { // Check if Enter is pressed without Shift (to avoid creating a new line)
            e.preventDefault(); // Prevent default behavior (e.g., line break)
            handleCommentSubmit(e); // Call the function to submit the comment
        }
    };

    return (
        <div className='text-white'>
            <h2 className='text-2xl font-bold mb-4'>Comments</h2>
            <form onSubmit={handleCommentSubmit} className='mb-4 sticky top-16 '>
                <div className='relative'>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onKeyDown={handleKeyDown} // Attach the keydown event handler here
                        rows="auto"
                        className='w-full p-2 rounded-md  border border-gray-600 pr-10 bg-gray-800 text-white'
                        placeholder='Write your thought...'
                    />
                    <button
                        type="submit"
                        className='mt-2 bg-green-600 text-white p-2 rounded-md absolute bottom-3 right-4'
                    >
                      <FaLocationArrow />
                    </button>    
                </div>
            </form>
            <div className='overflow-y-scroll h-[100px] md:h-auto scroller'>
                {comments.length === 0 ? (
                    <p>No comments yet</p>
                ) : (
                    comments.map((c, index) => (
                        <div key={index} className='border-b border-gray-600 pb-2 mb-2 flex items-start'>
                            <img
                                src={c.profileImage || dumprof} // Fallback to a default profile image if none exists
                                alt='Profile'
                                className='w-10 h-10 rounded-full mr-3'
                            />
                            <div>
                                <p><strong>{c.name}</strong>: {c.text}</p>
                                <small>{new Date(c.timestamp.seconds * 1000).toLocaleString()}</small>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CommentSection;










// import React, { useState, useEffect } from 'react';
// import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
// import { db } from '../../Config/firebase'; // Import the Firestore database

// const CommentSection = ({ songId }) => {
//     const [comment, setComment] = useState(''); // For holding the user's comment input
//     const [comments, setComments] = useState([]); // For storing all comments fetched from Firestore

//     // Fetch comments for the specific song when the component mounts
//     useEffect(() => {
//         const fetchComments = async () => {
//             const commentsQuery = query(collection(db, 'comments'), where('songId', '==', songId)); // Query comments for the specific song
//             const querySnapshot = await getDocs(commentsQuery);
//             const commentsData = querySnapshot.docs.map(doc => doc.data());
//             setComments(commentsData);
//         };

//         fetchComments();
//     }, [songId]);

//     // Handle comment submission
//     const handleCommentSubmit = async (e) => {
//         e.preventDefault(); // Prevent form refresh
//         if (comment.trim()) { // Check if the comment is not empty
//             await addDoc(collection(db, 'comments'), {
//                 songId: songId,
//                 text: comment,
//                 timestamp: new Date()
//             });
//             setComment(''); // Clear the input field
//             // Fetch updated comments after submission
//             const commentsQuery = query(collection(db, 'comments'), where('songId', '==', songId));
//             const querySnapshot = await getDocs(commentsQuery);
//             const commentsData = querySnapshot.docs.map(doc => doc.data());
//             setComments(commentsData);
//         }
//     };

//     // Handle keydown event
//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter' && !e.shiftKey) { // Check if Enter is pressed without Shift (to avoid creating a new line)
//             e.preventDefault(); // Prevent default behavior (e.g., line break)
//             handleCommentSubmit(e); // Call the function to submit the comment
//         }
//     };

//     return (
//         <div className='text-white'>
//             <h2 className='text-2xl font-bold mb-4'>Comments</h2>
//             <form  onSubmit={handleCommentSubmit} className='mb-4 sticky top-4 '>
//                 <div className='relative'>
//                  <textarea
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                     onKeyDown={handleKeyDown} // Attach the keydown event handler here
//                     rows="4"
//                     className='w-full p-2 rounded-md border border-gray-600 bg-gray-800 text-white'
//                     placeholder='Write your thought...'
//                 />
//                 <button
//                     type="submit"
//                     className='mt-2 bg-green-600 text-white p-2 rounded-md absolute bottom-3 right-0'
//                 >
//                     Post Comment
//                 </button>    
//                 </div>
               
//             </form>
//             <div className='overflow-y-scroll h-[60svh]' >
//                 {comments.map((c, index) => (
//                     <div key={index} className='border-b border-gray-600 pb-2 mb-2'>
//                         <p>{c.text}</p>
//                         <small>{new Date(c.timestamp.seconds * 1000).toLocaleString()}</small>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default CommentSection;
