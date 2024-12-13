import React, { useRef, useState } from 'react';
import { signin, signup } from '../../Config/firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar,';

const Login = ({ setfullname,setuseremail }) => {
  const [login, setLogin] = useState('Signup');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
 // Ensure this is called correctly after signup or login

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      if (login === 'Signup') {
        await signup(username, email, password);
        setfullname(username)
      
        // toast.success('Account Created Successfully', { theme: 'dark' });
        navigate('/home'); // Redirect after successful signup
      } else {
        await signin(email, password);
        // toast.success('Account Logged in Successfully', { theme: 'dark' });
        navigate('/home'); 
         setuseremail(email); // Redirect after successful login
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred, please try again.', { theme: 'dark' });
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Check if Enter is pressed without Shift (to avoid creating a new line)
        e.preventDefault(); // Prevent default behavior (e.g., line break)
        handleCommentSubmit(e); // Call the function to submit the comment
    }
};
  return (
    <div>
      <Navbar/>
      <form onSubmit={submitHandle} className='w-full h-svh  flex items-start justify-center p-4' >
        <div className='flex items-center justify-center flex-col border-neutral-700 border-2 shadow-xl shadow-emerald-800 p-3 rounded-lg m-2 min-w-80 w-auto '>
          <h1 className='text-white text-3xl font-semibold' >{login}</h1>
          {
            login === 'Signup' ? <input onChange={(e) => setUsername(e.target.value)} className='text-white outline-none rounded-md outline-gray-600 focus-within:outline-none   focus:bg-zinc-800 my-2 bg-transparent placeholder:text-zinc-600 text-xl p-2 focus-within:border-2 border-white px-4' type="text" placeholder='Fullname' required /> : null
          }

          <input onChange={(e) => setEmail(e.target.value)} className='text-white outline-none rounded-md outline-gray-600 focus-within:outline-none focus:bg-zinc-800 my-2 bg-transparent placeholder:text-zinc-600 text-xl p-2 focus-within:border-2 border-white px-4' type="email" placeholder='Email' required />
          <input onChange={(e) => setPassword(e.target.value)} className='text-white outline-none outline-gray-600 focus-within:outline-none  rounded-md border-gray-600 focus:bg-zinc-800 my-2 bg-transparent placeholder:text-zinc-600 text-xl p-2 focus-within:border-2 focus-within:border-white  px-4' type="password" placeholder='password' required minLength={6} />
          {
            login === 'Sign In' ? <p className='text-white'>Create an account? <span className='text-sky-500 hover:underline cursor-pointer select-none whitespace-nowrap' onClick={() => setLogin('Signup')}>Create Account</span></p> : <p className='text-white'>Do you already have an account? <span className='text-sky-500 hover:underline cursor-pointer select-none whitespace-nowrap' onClick={() => setLogin('Sign In')}>Login Here</span></p>
          }
          <div className="but">
            {
              login === 'Signup' ? <button  onKeyDown={handleKeyDown} type='submit' className=' text-white border-none outline-none bg-green-700 rounded-xl p-2 m-2 hover:bg-green-800 transition-all duration-200' ><h3>Create Account</h3></button> :
                <button type='submit' className='text-white border-none outline-none bg-green-700 rounded-xl p-2 m-2 hover:bg-green-800 transotion-all duration-200' ><h3>Login Account</h3></button>
            }

          </div>


        </div>

      </form>
    </div>
  );
};

export default Login;
