import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthProvider';

const ExtraSection2 = () => {
    const { theme } = useContext(AuthContext);
    const reviews = [
        {
            "profile_img": "https://randomuser.me/api/portraits/men/1.jpg",
            "name": "John Doe",
            "profession": "Software Engineer",
            "review": "Visa Navigator made my visa application process so simple. Their guidance was top-notch!",
            "date": "January 15, 2024"
        },
        {
            "profile_img": "https://randomuser.me/api/portraits/men/22.jpg",
            "name": "James Smith",
            "profession": "Graphic Designer",
            "review": "The insights and tips provided by Visa Navigator were incredibly useful. Highly recommend!",
            "date": "February 10, 2024"
        },
        {
            "profile_img": "https://randomuser.me/api/portraits/men/3.jpg",
            "name": "Michael Brown",
            "profession": "Teacher",
            "review": "The daily updates on visa regulations helped me stay informed and ahead. Fantastic service!",
            "date": "March 5, 2024"
        },
        {
            "profile_img": "https://randomuser.me/api/portraits/men/4.jpg",
            "name": "David Davis",
            "profession": "Marketing Specialist",
            "review": "Visa Navigator's customer service was amazing. They were with me every step of the way.",
            "date": "April 20, 2024"
        },
        {
            "profile_img": "https://randomuser.me/api/portraits/men/5.jpg",
            "name": "Daniel Wilson",
            "profession": "Data Analyst",
            "review": "The platform's ease of use and clear instructions saved me a lot of time. Thank you, Visa Navigator!",
            "date": "May 15, 2024"
        },
        {
            "profile_img": "https://randomuser.me/api/portraits/men/6.jpg",
            "name": "Samuel Martinez",
            "profession": "Content Writer",
            "review": "Visa Navigator's personalized advice made my visa application process a breeze. Truly grateful!",
            "date": "June 10, 2024"
        },
        {
            "profile_img": "https://randomuser.me/api/portraits/men/7.jpg",
            "name": "James Anderson",
            "profession": "Project Manager",
            "review": "The detailed guides and resources on Visa Navigator were incredibly helpful. A must-use service!",
            "date": "July 25, 2024"
        },
        {
            "profile_img": "https://randomuser.me/api/portraits/men/8.jpg",
            "name": "Oliver Taylor",
            "profession": "HR Specialist",
            "review": "Visa Navigator's interactive tools made everything so much easier. I can't thank them enough!",
            "date": "August 20, 2024"
        },
        {
            "profile_img": "https://randomuser.me/api/portraits/men/9.jpg",
            "name": "William Harris",
            "profession": "Consultant",
            "review": "The platform's features are very user-friendly and comprehensive. Visa Navigator is fantastic!",
            "date": "September 10, 2024"
        },
        {
            "profile_img": "https://randomuser.me/api/portraits/men/10.jpg",
            "name": "Isaac Clark",
            "profession": "Researcher",
            "review": "Visa Navigator's support team was incredibly responsive and helpful throughout my application process.",
            "date": "October 10, 2024"
        },
        {
            "profile_img": "https://randomuser.me/api/portraits/men/11.jpg",
            "name": "Benjamin Lee",
            "profession": "Software Developer",
            "review": "The resources provided by Visa Navigator were spot-on. I was able to get my visa with ease!",
            "date": "November 7, 2024"
        },
        {
            "profile_img": "https://randomuser.me/api/portraits/men/12.jpg",
            "name": "Alexander King",
            "profession": "Entrepreneur",
            "review": "Visa Navigator's comprehensive guides and tips made the visa process straightforward and stress-free.",
            "date": "December 7, 2024"
        }
    ];
    const [showAll, setShowAll] = useState(false);
    return (
        <div className={`w-[90%] mx-auto my-24 md:my-36 ${theme === 'dark' ? 'text-white' : 'text-[#171924]'}`}>
            <h3 className='text-3xl text-center font-bold mb-4'>Our Customer Reviews</h3>
            <p className='text-center mb-8 w-[80%] mx-auto md:w-[60%] lg:w-[40%] xl:w-[30%] opacity-70'>
                Hear from Our Community Real insights and experiences shared by our users
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {(showAll ? reviews : reviews.slice(0, 3)).map(review => (
                    <div
                        key={review.name}
                        className={`h-full border rounded-lg flex flex-col overflow-hidden shadow-lg ${theme === "dark" ? "bg-gray-800/20 border-gray-700" : "bg-white border-gray-200/50"}`}
                    >
                        <div className="h-[120px] p-4 flex items-center gap-4">
                            <img
                                src={review.profile_img}
                                alt={review.name}
                                className="w-24 h-24 object-cover rounded-full"
                            />
                            <div>
                                <h3 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-[#f52549]"}`}>
                                    {review.name}
                                </h3>
                                <p className={`${theme === "dark" ? "text-white/75" : "text-[#171924]/75"}`}>
                                    {review.profession}
                                </p>
                            </div>
                        </div>
                        <div className='p-4 flex-grow'>
                            <p className={`${theme === "dark" ? "text-white/65" : "text-[#171924]/65"}`}>
                                {review.review}
                            </p>
                        </div>
                        <div className="relative bg-[#f52549] text-white font-bold py-2 px-4 shadow-lg mt-2">
                            {review.date}
                            <div className="absolute top-0 left-10 -translate-y-full w-0 h-0 border-x-8 border-b-8 border-x-transparent border-b-[#f52549]"></div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='mt-12 w-full md:w-1/2 lg:w-1/5 mx-auto'>
                <button className={`btn w-full bg-transparent ${theme === 'dark' ? 'text-white border-white' : 'border-[#f52549] text-[#f52549]'} font-bold hover:glass hover:bg-[#f52549]/90 transition-all delay-75`} onClick={() => setShowAll(!showAll)}>
                    {showAll ? 'See Less' : 'See More'}
                </button>
            </div>
        </div>
    );
};

export default ExtraSection2;
