import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import { Typewriter } from 'react-simple-typewriter';
import { Fade } from 'react-awesome-reveal';

const Banner = () => {
    const slides = [
        {
            title: "Master Your Visa Journey with Visa Navigator",
            description: "Visa Navigator simplifies your travel by providing clear visa requirements and easy online applications.",
            img: "https://i.ibb.co/8gJjChnZ/emanuviews-AKYjr-km-Yt-Q-unsplash.jpg",
        },
        {
            title: "Your Trusted Guide to Visa Success and Smooth Travel",
            description: "Simplify your visa journey with expert guidance. Ensure a seamless process and travel with confidence.",
            img: "https://i.ibb.co/JRW89dcP/junel-mujar-Vifyz-F-S00-E-unsplash.jpg",
        },
        {
            title: "Empower Your Travel Dreams with Expert Visa Guidance",
            description: "Simplifying your visa journey with expert insights and seamless support. Travel the world with confidence and ease.",
            img: "https://i.ibb.co/84KMW92w/sacha-verheij-5bwg-W8-9-OPs-unsplash.jpg",
        }
    ];

    const { theme } = useContext(AuthContext);

    return (
        <div className='mb-20 active:scale-80 animate__animated animate__fadeInLeft'>
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{
                    clickable: true,
                    renderBullet: (index, className) => (
                        `<span class="${className}" style="background-color: white; width: 12px; height: 12px; border-radius: 50%; display: inline-block; margin: 0 5px;"></span>`
                    ),
                }}
                autoplay={{ delay: 5000 }}
                loop={true}
                className="w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="flex items-center gap-10 justify-between h-[640px] md:h-[720px] bg-cover bg-center relative"
                            style={{ backgroundImage: `url(${slide.img})` }}
                        >
                            <div className={`absolute ${theme === 'dark' ? 'bg-[#171924]/60' : 'bg-gray-600/50'} w-full h-full`}></div>
                            <div className={`text-center w-[95%] md:w-fit mx-auto border-2 border-white/40 py-8 px-4 md:px-6 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-[#171924]/5'} backdrop-blur-md text-white md:absolute z-10 md:left-1/2 md:-translate-x-1/2`}>
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold md:w-[90%] mx-auto leading-relaxed">
                                    <Typewriter words={[slide.title]} loop={true} cursor cursorStyle="|" typeSpeed={70} deleteSpeed={50} delaySpeed={1000} />
                                </h3>
                                <Fade>
                                    <p className="mt-5 mb-7 md:w-[75%] mx-auto">
                                        {slide.description}
                                    </p>
                                </Fade>
                                <Link to={'/all-visas'}>
                                    <button className='btn bg-[#f52549] text-white md:px-8 md:py-4 text-[18px] h-auto border-transparent hover:border-white hover:bg-transparent hover:text-white'>
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
