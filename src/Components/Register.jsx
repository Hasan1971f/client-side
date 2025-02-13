import React, { useContext, useState } from 'react';
import { FaGoogle, FaRegistered } from 'react-icons/fa';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase-init';
import { toast } from 'react-toastify';

const Register = () => {
    const bgImg = 'https://i.ibb.co/pLryfV9/Travel.jpg';
    const [showPass, setShowPass] = useState(false);
    const { theme, createUser, continueWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const photoUrl = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            toast.info("Password must have:\n- At least one uppercase letter\n- At least one lowercase letter\n- Minimum length of 6 characters");
            return;
        }

        createUser(email, password)
            .then(result => {
                toast.success('Successfully Registered');
                updateProfile(auth.currentUser, { displayName: name, photoURL: photoUrl })
                    .then(result => {
                       
                    })
                navigate('/');
                form.reset();
            })
            .catch(error => {
                toast.error(error.message);
            })
    }

    const handleContinueWithGoogle = () => {
        continueWithGoogle()
            .then(result => {
                toast.success('Successfully Registered With Google');
                navigate('/');
            })
            .catch(error => {
                toast.error(error.message);

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
            <div className="relative z-10 w-[95%] md:w-[90%] mx-auto p-6 md:p-8 min-h-[850px] xl:min-h-[950px] flex flex-col justify-center">
                <p className="text-white/80">Start For Free</p>
                <h3 className="flex items-end mb-8 gap-1 font-bold text-3xl">
                    Register new account<span className="text-[#f52549] text-5xl">.</span>
                </h3>

                <form className="flex flex-col gap-4" onSubmit={handleRegister}>
                    <div className='w-full md:w-3/5'>
                        <input
                            required
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="bg-gray-300/10 p-4 rounded-lg placeholder:text-white focus:outline-white/10 focus:outline-double focus:bg-transparent focus:glass w-full border border-white/5"
                        />
                    </div>
                    <div className='w-full md:w-3/5'>
                        <input
                            type="text"
                            name="photo"
                            placeholder="Photo Url"
                            className="bg-gray-300/10 p-4 rounded-lg placeholder:text-white focus:outline-white/10 focus:outline-double focus:bg-transparent focus:glass w-full border border-white/5"
                        />
                    </div>
                    <div className='w-full md:w-3/5'>
                        <input
                            required
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="bg-gray-300/10 p-4 rounded-lg placeholder:text-white focus:outline-white/10 focus:outline-double focus:bg-transparent focus:glass w-full border border-white/5"
                        />
                    </div>
                    <div className='relative w-full md:w-3/5'>
                        <input
                            required
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

                    <div className='flex gap-2 w-full md:w-3/5 items-center justify-between'>
                        <p className='text-white/80'> Already Have An Account? </p>
                        <Link to={'/login'} className='text-[#f52549] font-semibold underline'> Login </Link>
                    </div>

                    <div className='mt-4 flex flex-col-reverse sm:flex-row gap-5 w-full md:w-3/5'>
                        <div className='btn lg:w-1/3 bg-gray-300/20 border-none text-white font-bold hover:glass hover:bg-gray-300/10 transition-all delay-75' onClick={handleContinueWithGoogle}>
                            <FaGoogle></FaGoogle>
                            Continue With Google
                        </div>
                        <button className='btn flex-grow bg-[#f52549] border-none text-white font-bold hover:glass hover:bg-[#f52549]/90 transition-all delay-75'>
                            Register Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
