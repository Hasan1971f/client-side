import { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import Swal from 'sweetalert2';

const AddVisa = () => {
    const { pageBannerImg, theme, user, updateVisas } = useContext(AuthContext);
    const userName = user.displayName;
    const userEmail = user.email;



    const handleAddVisa = (e) => {
        e.preventDefault();
        const form = e.target;

        const countryUrl = form.countryImg.value;
        const countryName = form.countryName.value;
        const visaType = form.visaType.value;
        const processingTime = form.processingTime.value + ' Days';

        const requiredDocuments = Array.from(form.requiredDocuments)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);

        if (requiredDocuments.length === 0) {
            Swal.fire({
                title: "Please select at least one required document",
                showClass: {
                    popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                    popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                },
                confirmButtonText: "OK",
                confirmButtonColor: '#f52549',
            });
            return;
        }

        const description = form.description.value;
        const ageRestriction = form.ageRestriction.value;
        const fee = form.fee.value;
        const validity = form.validity.value + ' month';
        const applicationMethod = form.applicationMethod.value;

        const newVisa = { countryUrl, countryName, visaType, processingTime, requiredDocuments, description, ageRestriction, fee, validity, applicationMethod, userName, userEmail };

        // send to server 
        fetch('https://server-side-phi-green.vercel.app/visa', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newVisa)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    updateVisas({ ...newVisa, _id: data.insertedId });
                    let timerInterval;
                    Swal.fire({
                        title: "Congratulation",
                        html: "Your Visa Added SuccessFully",
                        timer: 1800,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading();
                            const timer = Swal.getPopup().querySelector("b");
                            timerInterval = setInterval(() => {
                                timer.textContent = `${Swal.getTimerLeft()}`;
                            }, 100);
                        },
                        willClose: () => {
                            clearInterval(timerInterval);
                        }
                    }).then((result) => {
                        if (result.dismiss === Swal.DismissReason.timer) {
                            // console.log("I was closed by the timer");
                        }
                    });
                    form.reset();
                }
            })
    }

    return (
        <div>
            <div className="relative w-full h-[500px] flex flex-col items-center"
                style={{
                    backgroundImage: `url(${pageBannerImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <div className={`absolute w-full h-full ${theme === 'dark' ? "bg-gradient-to-tr from-[#171924] via-[#171924]/80 to-[#6b1020]/75" : "bg-gradient-to-tr from-white/90 via-white/50 to-[#f52549]/75"}`}></div>
                <div className={`w-[90%] mx-auto ${theme === 'dark' ? 'text-white' : 'text-[#171924]'} z-10 flex justify-center items-center flex-col h-full`}>
                    <h3 className='text-center text-4xl md:text-5xl font-bold mb-5'> Add Visa </h3>
                    <p className={`text-center text-xl ${theme === 'dark' ? 'text-white/80' : 'text-[#171924]/80'}`}>
                        Visa Navigator {'>'} Add Visa
                    </p>

                </div>
            </div>
            <div className={`relative w-[90%] md:w-[85%] mx-auto my-20 ${theme === 'dark' ? 'text-white' : 'text-[#171924]'}`}>
                {
                    theme === 'dark' ?
                        <div className="absolute max-w-[500px] h-[300px] -translate-x-1/2 left-1/2 bottom-1/2 translate-y-1/2  bg-[rgba(82,147,226,0.12)] -z-10 rotate-12 blur-3xl rounded-full"></div>
                        :
                        <div className='absolute w-full h-full'>
                            <img src="https://i.ibb.co.com/Gp9L6yv/images.jpg" className='w-full h-full object-cover opacity-10 rotate-180 rounded-xl' alt="" />
                        </div>

                }
                <form onSubmit={handleAddVisa} className={`${theme === 'dark' ? 'bg-gradient-to-tl from-[#5293e2]/10 via-[#171924]/10 to-[#5293e2]/10 border border-white/20 backdrop-blur-xl' : 'border backdrop-blur-xl'} rounded-xl px-3 py-4 sm:px-4 sm:py-5`}>
                    <div className={`w-full grid lg:grid-cols-2 gap-3`}>
                        <label className="input input-bordered h-auto py-4 flex items-center gap-2 bg-transparent flex-col sm:flex-row">
                            <p className={`flex-shrink-0 font-semibold w-full text-center sm:text-left sm:w-[30%] border-b pb-2 sm:pb-0 sm:border-b-transparent sm:border-r ${theme === 'dark' ? 'border-white/20' : ''}`}> Country Image: </p>
                            <input type="text" name="countryImg" placeholder="e.g. https://ibb.co.com/9Vjt6vz" className='text-center sm:text-left' />
                        </label>
                        <label className="input input-bordered h-auto py-4 flex items-center gap-2 bg-transparent flex-col sm:flex-row">
                            <p className={`flex-shrink-0 font-semibold w-full text-center sm:text-left sm:w-[30%] border-b pb-2 sm:pb-0 sm:border-b-transparent sm:border-r ${theme === 'dark' ? 'border-white/20' : ''}`}> Country Name: </p>
                            <input type="text" required name="countryName" placeholder="e.g. Bangladesh" className='text-center sm:text-left' />
                        </label>
                        <div>
                            <label className="input input-bordered h-auto py-4 flex items-center gap-2 bg-transparent flex-col sm:flex-row">
                                <p className={`flex-shrink-0 font-semibold w-full text-center sm:text-left sm:w-[30%] border-b pb-2 sm:pb-0 sm:border-b-transparent sm:border-r ${theme === 'dark' ? 'border-white/20' : ''}`}> Visa Type: </p>
                                <select name="visaType" required className='w-full bg-transparent text-center sm:text-left'>
                                    <option value="" selected disabled className={`${theme === 'dark' ? 'bg-gray-800' : ''}`}>
                                        Select A Visa Type
                                    </option>
                                    <option value="Tourist Visa" className={`${theme === 'dark' ? 'bg-gray-800' : ''}`}>
                                        Tourist Visa
                                    </option>
                                    <option value="Student Visa" className={`${theme === 'dark' ? 'bg-gray-800' : ''}`}>
                                        Student Visa
                                    </option>
                                    <option value="Official Visa" className={`${theme === 'dark' ? 'bg-gray-800' : ''}`}>
                                        Official Visa
                                    </option>
                                </select>
                            </label>
                        </div>
                        {/* Processing Time */}
                        <label className="input input-bordered h-auto py-4 flex items-center gap-2 bg-transparent flex-col sm:flex-row">
                            <p className={`flex-shrink-0 font-semibold w-full text-center sm:text-left sm:w-[30%] border-b pb-2 sm:pb-0 sm:border-b-transparent sm:border-r ${theme === 'dark' ? 'border-white/20' : ''}`}> Processing Time: </p>
                            <input type="number" name="processingTime" placeholder="e.g. 30 Days" className='sm:text-left text-center' />
                        </label>
                        {/* Required Documents */}
                        <div className="input input-bordered h-auto py-4 flex flex-col bg-transparent">
                            <p className={`flex-shrink-0 font-semibold pb-2 border-b mb-4 ${theme === 'dark' && 'border-white/15'} text-center sm:text-left`}>
                                Required Documents:
                            </p>
                            <div className="flex flex-col gap-2.5">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="requiredDocuments"
                                        value="Valid Passport"
                                        className="checkbox"
                                    />
                                    <span>Valid Passport</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="requiredDocuments"
                                        value="Visa Application Form"
                                        className="checkbox"
                                    />
                                    <span>Visa Application Form</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="requiredDocuments"
                                        value="Recent Passport-Sized Photograph"
                                        className="checkbox"
                                    />
                                    <span>Recent Passport-Sized Photograph</span>
                                </label>
                            </div>
                        </div>
                        {/* Description */}
                        <div className='input input-bordered h-auto py-4 flex flex-col gap-4 bg-transparent'>
                            <label>
                                <p className={`flex-shrink-0 font-semibold pb-2 border-b mb-4 ${theme === 'dark' && 'border-white/15'} text-center sm:text-left`}> Description: </p>
                                <textarea name="description" id="" className='w-full sm:h-full bg-transparent'></textarea>
                            </label>
                        </div>
                        {/* Age Restriction */}
                        <label className="input input-bordered h-auto py-4 flex items-center gap-2 bg-transparent flex-col sm:flex-row">
                            <p className={`flex-shrink-0 font-semibold w-full text-center sm:text-left sm:w-[30%] border-b pb-2 sm:pb-0 sm:border-b-transparent sm:border-r ${theme === 'dark' ? 'border-white/20' : ''}`}> Age Restriction: </p>
                            <input type="number" name="ageRestriction" placeholder="e.g. 21" className='text-center sm:text-left' />
                        </label>
                        {/* Fee */}
                        <label className="input input-bordered h-auto py-4 flex items-center gap-2 bg-transparent flex-col sm:flex-row">
                            <p className={`flex-shrink-0 font-semibold w-full text-center sm:text-left sm:w-[30%] border-b pb-2 sm:pb-0 sm:border-b-transparent sm:border-r ${theme === 'dark' ? 'border-white/20' : ''}`}> Fee: </p>
                            <input type="number" required name="fee" placeholder="e.g. 12000" className='text-center sm:text-left' />
                        </label>
                        {/* Validity */}
                        <label className="input input-bordered h-auto py-4 flex items-center gap-2 bg-transparent flex-col sm:flex-row">
                            <p className={`flex-shrink-0 font-semibold w-full text-center sm:text-left sm:w-[30%] border-b pb-2 sm:pb-0 sm:border-b-transparent sm:border-r ${theme === 'dark' ? 'border-white/20' : ''}`}> Validity: </p>
                            <input type="number" required name="validity" placeholder="e.g. 6 month" className='text-center sm:text-left' />
                        </label>
                        {/* Application Method */}
                        <label className="input input-bordered h-auto py-4 flex items-center gap-2 bg-transparent flex-col sm:flex-row">
                            <p className={`flex-shrink-0 font-semibold w-full text-center sm:text-left sm:w-[30%] border-b pb-2 sm:pb-0 sm:border-b-transparent sm:border-r ${theme === 'dark' ? 'border-white/20' : ''}`}> Application Method: </p>
                            <input type="text" name="applicationMethod" placeholder="e.g. Online" className='text-center sm:text-left' />
                        </label>
                    </div>
                    <div className='w-full md:w-1/3 lg:w-1/4 mx-auto mt-8'>
                        <button className="btn bg-[#f52549] w-full border-none text-white font-bold lg:px-6 rounded-lg hover:glass hover:bg-[#f52549]/90 transition-all delay-75 xl:text-[18px] h-auto"> Add Visa </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddVisa;