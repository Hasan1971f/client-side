import React, { useContext, useRef, useState } from 'react';
import { FaDivide, FaGoogle, FaRegistered } from 'react-icons/fa';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import { toast } from 'react-toastify';

const Login = () => {
    const bgImg = 'https://i.ibb.co/pLryfV9/Travel.jpg';
    const [showPass, setShowPass] = useState(false);
    const { theme, logInUser, continueWithGoogle, forgotPassword } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const emailRef = useRef();

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        logInUser(email, password)
            .then(result => {
                toast.success('Successfully Logged In');
                navigate(from, { replace: true });
            })
            .catch(error => {
                toast.error(error.message);
            })
    }

    const handleContinueWithGoogle = () => {
        continueWithGoogle()
            .then(result => {
                toast.success('Successfully Logged In With Google');
                navigate(from, { replace: true });
            })
            .catch(error => {
                toast.error(error.message);

            })
    }
    const handleForgotPassword = () => {
        const email = emailRef.current.value;
        forgotPassword(email)
            .then(() => {
                toast.success('Check your mail to reset password');
                window.open('https://mail.google.com', '_blank');
            })
            .catch(error => {
                toast.error(error.message + ' ' + 'Try again with a valid email')
            })
    }


    return (
        <div
            className="relative flex items-center text-white"
            style={{
                backgroundImage: `url(${bgImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Background Overlay */}
            {
                theme === 'dark' ?
                    <div className="absolute w-full h-full bg-gradient-to-tr from-[#171924] via-[#171924]/95 to-[#6b1020]/95"></div>
                    :
                    <div className="absolute w-full h-full bg-gradient-to-b from-white/60 via-[#171924]/95 to-[#6b1020]/95"></div>
            }

            {/* Form Content */}
            <div className="relative z-10 w-[95%] md:w-[90%] mx-auto p-6 md:p-8 min-h-[720px] xl:min-h-[900px] flex flex-col justify-center">
                <p className="text-white/80"> One step closer to managing your visas! </p>
                <h3 className="flex items-end mb-8 gap-1 font-bold text-3xl">
                    Login To Continue<span className="text-[#f52549] text-5xl">.</span>
                </h3>

                <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                    <div className='w-full md:w-3/5'>
                        <input
                            ref={emailRef}
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="bg-gray-300/10 p-4 rounded-lg placeholder:text-white focus:outline-white/10 focus:outline-double focus:bg-transparent focus:glass w-full border border-white/5"
                        />
                    </div>
                    <div className='relative w-full md:w-3/5'>
                        <input
                            type={showPass ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            className="bg-gray-300/10 p-4 rounded-lg placeholder:text-white focus:outline-white/10 focus:outline-double focus:bg-transparent focus:glass border border-white/5 w-full"
                        />
                        <div className='text-[18px] text-white absolute top-5 right-5 cursor-pointer' onClick={() => { setShowPass(!showPass) }}>
                            {
                                !showPass ? <LuEyeClosed></LuEyeClosed> : <LuEye></LuEye>
                            }
                        </div>
                    </div>

                    <div className="w-full md:w-3/5 text-right -mt-2">
                        <p
                            onClick={handleForgotPassword}
                            className="text-[#f52549] font-semibold underline hover:text-[#f52549]/90 transition-all cursor-pointer"
                        >
                            Forgot Password?
                        </p>
                    </div>

                    <div className='mt-3 mb-1.5 flex flex-col-reverse sm:flex-row gap-5 w-full md:w-3/5'>
                        <div className='btn lg:w-1/3 bg-gray-300/20 border-none text-white font-bold hover:glass hover:bg-gray-300/10 transition-all delay-75' onClick={handleContinueWithGoogle}>
                            <FaGoogle></FaGoogle>
                            Continue With Google
                        </div>
                        <button className='btn flex-grow bg-[#f52549] border-none text-white font-bold hover:glass hover:bg-[#f52549]/90 transition-all delay-75'>
                            Login
                        </button>
                    </div>
                    <div className='flex gap-2 w-full md:w-3/5 items-center justify-between'>
                        <p className='text-white/80 flex-shrink-0'> Don't Have An Account? </p>
                        <Link to={'/register'} className='text-[#f52549] font-semibold underline'> Register Account </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
