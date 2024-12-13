import React from 'react';
import Navbar from '../../Components/Navbar/Navbar,';
import Songcard from '../../Components/Songcard/Songcard';
import CommentSection from '../../Components/Comment/CommentSection';
import Footer from '../../Components/Footer/Footer';


const Homepage = ({fullname}) => {
    return (
        <div>
            <div className='sticky top-0 z-50'>
                 <Navbar />    
            </div>
       
            <div>
                <Songcard/>
               
            </div>
            <div>
                <Footer/>
            </div>
            
        </div>
    );
};

export default Homepage;

