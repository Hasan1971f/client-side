import React, { useContext } from 'react';
import animation1 from './animation1.json'
import Lottie from 'lottie-react';
import { AuthContext } from '../AuthProvider';

const AboutUs = () => {
    const { theme } = useContext(AuthContext);

    return (
        <div className={`w-[90%] mx-auto my-24 md:my-36 ${theme === 'dark' ? 'text-white' : 'text-[#171924]'}`}>
            <h3 className='text-3xl text-center font-bold mb-4'> About Us </h3>
            <p className='text-center mb-8 w-[90%] mx-auto md:w-[70%] lg:w-[50%] xl:w-[40%] opacity-70'>
                Welcome to Visa Navigator, your trusted guide in the complex world of visas. We simplify your application process with up-to-date information, expert advice, and personalized support for your travel goals
            </p>
            <div className={`h-full border rounded-lg overflow-hidden shadow-lg flex flex-col-reverse gap-6 lg:flex-row justify-between p-6 ${theme === "dark"
                ? "bg-gray-800/20 border-gray-700"
                : "bg-white border-gray-200/50"
                }`}>
                <div className='lg:w-1/2'>
                    <h2 className="text-2xl font-bold mb-4">Our Services:</h2>
                    <ul className="list-disc pl-6 mb-4">
                        <li>Detailed guides on visa requirements and application processes.</li>
                        <li>Personalized advice from visa experts.</li>
                        <li>Real-time updates on visa policies and travel restrictions.</li>
                        <li>User-friendly tools to calculate fees, estimate processing times, and track applications.</li>
                    </ul>
                    <h2 className="text-2xl font-bold mb-4">Our Commitment:</h2>
                    <p>We are dedicated to delivering accurate, reliable, and user-friendly services. Our team continuously improves our platform to keep you informed with the latest visa information.</p>
                </div>
                <div className='border rounded-lg overflow-hidden'>
                    <Lottie animationData={animation1} style={{ borderRadius: 'inherit' }} />
                </div>
            </div>
        </div>
    );
};

export default AboutUs;