import React from 'react';
import {useNavigate} from 'react-router-dom'
import hero from '../../hero-img.png';
import ButtonLg from '../../components/ButtonLg';
import Regions from '../../components/Regions';

const Landing = () => {
    const navigate = useNavigate();
    const handleSignInClick = () => {
      navigate('/auth', { state: { showSignUp: true } });
    }
  return (
    <>
        <div className=' lg:mx-auto max-w-screen-xl gap-5 flex my-12 justify-between mx-5'>
            <img className="hidden max-w-sm md:block" src={hero} alt="Logo"/>
            <div className='flex flex-col justify-between items-start max-w-3xl'>
                <div className='w-36 h-2 bg-gradient-to-r from-primary to-black'>
                </div>
                 <h1 className=' font-semibold text-4xl mb-1'>
                     Muungano Properties
                </h1>
                <p className='md:mb-10 mb-5 text-xl font-medium text-justify leading-8 text-gray-500'>
                        Your trusted platform for government-regulated real estate management. Buy, sell, and manage properties securely with expert guidance and legal compliance. Ensure transparency, protect investments, and navigate the market with confidence.
                </p>
                <ButtonLg buttonText='Sign Up' onClick={handleSignInClick}/>
            </div>
        </div>
        <div className=' lg:mx-auto mx-5 max-w-screen-xl flex mb-24 md:mt-40 mt-14 justify-between items-center'>
            <div className='md:w-3/12 md:block hidden'>
                 <h1 className=' font-semibold text-4xl mb-4'>
                    Explore best properties all over Tanzania 
                </h1>
                <div className='w-36 h-2 bg-gradient-to-r from-primary to-black mb-7'>
                </div>
                <p className='text-xl font-medium text-justify leading-8 text-gray-500'>
                    Muungano Properties holds a wide range of great properties available for sale across all major in Tanzania.
                </p>
            </div>
            <div className='md:w-8/12 w-full'>
                <Regions />
            </div>
        </div>
    </>
  )
}

export default Landing