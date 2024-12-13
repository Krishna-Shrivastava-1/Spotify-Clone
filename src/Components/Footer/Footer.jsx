import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import instaicon from '../../assets/instaicon.png'
// import twitter_icon from '../../assets/twitter_icon.png'
// import instagram_icon from '../../assets/instagram_icon.png'
// import facebook_icon from '../../assets/facebook_icon.png'


const Footer = () => {

    return (
        <div className='footer text-white p-5 bg-transparent' >
            <div className="footer-icons flex ">
                {/* <FontAwesomeIcon icon={faCoffee} /> */}
                <FaYoutube className='hover:text-red-600 text-5xl cursor-pointer transition-all duration-300 p-2 hover:bg-zinc-700 rounded-full' />
                <FaXTwitter className='hover:text-black text-5xl cursor-pointer transition-all duration-300 p-2 hover:bg-zinc-700 rounded-full ' />
                <div className='rounded-full hover:bg-zinc-700 relative group flex items-center justify-center transition-all duration-300'>
                    <FaInstagram className=' text-5xl cursor-pointer transition-all duration-300 p-2 hover:bg-zinc-700 rounded-full instar group-hover:text-transparent ' />
                    <img className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-7  hidden group-hover:block cursor-pointer' src={instaicon} alt="" />

                </div>

                <div className='rounded-full hover:bg-zinc-700'>
                    <FaFacebookF className='hover:text-[#1877F2] text-5xl cursor-pointer transition-all duration-300 p-2 ' />
                </div>

                <div className='rounded-full hover:bg-zinc-700'>
                    <FaLinkedinIn className='hover:text-[#0077B5] text-5xl cursor-pointer transition-all duration-300 p-2  ' />
                </div>

            </div>
            <ul className='grid grid-cols-4 gap-4 grid-rows-2'>

                <li className='cursor-pointer' >Help Centre</li>
                <li className='cursor-pointer' >Gift Cards</li>
                <li className='cursor-pointer' >Media Center</li>
                <li className='cursor-pointer' >Investor Relations</li>
                <li className='cursor-pointer' >Contact Us</li>
                <li className='cursor-pointer' >Terms of Use</li>
                <li className='cursor-pointer' >Privacy</li>
                <li className='cursor-pointer' >Legal Notices</li>
                <li className='cursor-pointer' >Jobs</li>

            </ul>
            <p className='copyright-text'>@ 1997-2024 SpotMus, Inc.</p>
        </div>
    )
}

export default Footer
