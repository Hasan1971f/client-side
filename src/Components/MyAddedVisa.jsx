import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";

const MyAddedVisa = () => {
    const { pageBannerImg, theme, user, visas, setVisas } = useContext(AuthContext);

    const myVisas = visas.filter(visa => visa.userEmail === user.email);

    const handleDeleteVisa = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't to delete this visa!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#171924",
            cancelButtonColor: "#f52549",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://server-side-phi-green.vercel.app/my-added-visa/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                                confirmButtonColor: '#f52549',
                            });
                            const remaining = visas.filter(visa => visa._id !== _id);
                            setVisas(remaining);
                        }
                    })

            }
        });
    }

    const handleUpdateVisa = (e, _id) => {
        // console.log(_id);

        e.preventDefault();
        const form = e.target;

        const countryUrl = form.countryImg.value;
        const countryName = form.countryName.value;
        const visaType = form.visaType.value;
        const processingTime = form.processingTime.value;
        const fee = form.fee.value;
        const validity = form.validity.value;
        const applicationMethod = form.applicationMethod.value;

        const updatedVisa = { countryUrl, countryName, visaType, processingTime, fee, validity, applicationMethod };

        // // Send to server
        fetch(`https://server-side-phi-green.vercel.app/my-added-visa/${_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedVisa)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Updated!",
                        text: "Visa details has been updated successfully.",
                        icon: "success",
                        confirmButtonColor: '#f52549',
                    });
                    document.getElementById(_id).close();
                    const updatedVisas = visas.map(visa =>
                        visa._id === _id ? { ...visa, ...updatedVisa } : visa
                    );
                    setVisas(updatedVisas);
                }
            })
            .catch(err => {
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong while updating visa details.",
                    icon: "error",
                });
                console.error(err);
            });
    };

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
                    <h3 className='text-center text-4xl md:text-5xl font-bold mb-5'> My Added Visas </h3>
                    <p className={`text-center text-xl ${theme === 'dark' ? 'text-white/80' : 'text-[#171924]/80'}`}>
                        Visa Navigator &gt; My Added Visas
                    </p>


                </div>
            </div>
            <div className={`w-[90%] mx-auto my-20 ${theme === 'dark' ? 'text-white' : 'text-[#171924]'}`}>
                <h3 className="text-3xl text-center font-bold"> My Added Visas: <span className="text-[#f52549]"> {myVisas.length} </span> </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {
                        myVisas.map((visa) => <div key={visa._id}
                            className={`h-full border rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${theme === "dark"
                                ? "bg-gray-800/20 border-gray-700"
                                : "bg-white border-gray-200/50"
                                }`}>
                            <div className="h-[220px] md:h-[250px] lg:h-[300px] relative">
                                <img
                                    src={visa.countryUrl}
                                    alt={visa.countryName}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                            </div>

                         
                            <div className="p-6 flex flex-col gap-3">
                                <h2 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-[#171924]"}`}>{visa.countryName}</h2>
                                <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                                    <strong>Visa Type:</strong> {visa.visaType}
                                </p>
                                <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                                    <strong>Processing Time:</strong> {visa.processingTime}
                                </p>
                                <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                                    <strong>Fee:</strong> {visa.fee} BDT
                                </p>
                                <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                                    <strong>Validity:</strong> {visa.validity}
                                </p>
                                <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                                    <strong>Application Method:</strong> {visa.applicationMethod}
                                </p>
                                {/* Button */}
                                <div className="mt-2 flex flex-col md:flex-row justify-between gap-3">
                                    <button className={`btn w-full md:w-2/3 font-bold ${theme === 'dark' ? 'bg-white text-[#171924] hover:bg-white/80' : 'bg-[#171924] text-white hover:bg-[#171924]/80'}`} onClick={() => document.getElementById(`${visa._id}`).showModal()}> Update Visa </button>
                                    <button className="btn bg-[#f52549] flex-grow text-white hover:bg-[#f52549]/80" onClick={() => handleDeleteVisa(visa._id)}> Delete </button>
                                </div>
                                <dialog id={visa._id} className="modal modal-middle">
                                    <div className={`p-4 sm:p-6 border w-1/2 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50 backdrop-blur-xl border-white/20 text-white' : 'text-[#171924] bg-white'} h-4/5 overflow-auto`}>
                                        <h3 className='font-semibold text-xl sm:text-2xl text-center mb-5'> Update Visa Details </h3>
                                        <form onSubmit={(e) => handleUpdateVisa(e, visa._id)}>
                                            <div className="flex flex-col gap-4">
                                                <label className="input input-bordered h-auto py-4 flex items-center gap-2 bg-transparent flex-col sm:flex-row">
                                                    <p className={`flex-shrink-0 font-semibold w-full text-center sm:text-left sm:w-[30%] border-b pb-2 sm:pb-0 sm:border-b-transparent sm:border-r ${theme === 'dark' ? 'border-white/20' : ''}`}> Country Image: </p>
                                                    <input type="text" name="countryImg" placeholder="e.g. https://ibb.co.com/9Vjt6vz" defaultValue={visa.countryUrl} required className='text-center sm:text-left' />
                                                </label>
                                                <label className="input input-bordered h-auto py-4 flex items-center gap-2 bg-transparent flex-col sm:flex-row">
                                                    <p className={`flex-shrink-0 font-semibold w-full text-center sm:text-left sm:w-[30%] border-b pb-2 sm:pb-0 sm:border-b-transparent sm:border-r ${theme === 'dark' ? 'border-white/20' : ''}`}> Country Name: </p>
                                                    <input type="text" required name="countryName" placeholder="e.g. Bangladesh" defaultValue={visa.countryName} className='text-center sm:text-left' />
                                                </label>
                                                <div>
                                                    <label className="input input-bordered h-auto py-4 flex items-center gap-2 bg-transparent flex-col sm:flex-row">
                                                        <p className={`flex-shrink-0 font-semibold w-full text-center sm:text-left sm:w-[30%] border-b pb-2 sm:pb-0 sm:border-b-transparent sm:border-r ${theme === 'dark' ? 'border-white/20' : ''}`}> Visa Type: </p>
                                                        <select name="visaType" required className='opacity-60 w-full bg-transparent text-center sm:text-left'>
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
                                                <label className="input input-bordered h-auto py-4 flex items-center gap-2 bg-transparent flex-col sm:flex-row">
                                                    <p className={`flex-shrink-0 font-semibold w-full text-center sm:text-left sm:w-[30%] border-b pb-2 sm:pb-0 sm:border-b-transparent sm:border-r ${theme === 'dark' ? 'border-white/20' : ''}`}> Processing Time: </p>
                                                    <input type="text" name="processingTime" defaultValue={visa.processingTime} placeholder="30 Days" className='sm:text-left text-center' />
                                                </label>
                                                {/* Fee */}
                                                <label className="input input-bordered h-auto py-4 flex items-center gap-2 bg-transparent flex-col sm:flex-row">
                                                    <p className={`flex-shrink-0 font-semibold w-full text-center sm:text-left sm:w-[30%] border-b pb-2 sm:pb-0 sm:border-b-transparent sm:border-r ${theme === 'dark' ? 'border-white/20' : ''}`}> Fee: </p>
                                                    <input type="number" required defaultValue={visa.fee} name="fee" placeholder="e.g. 12000" className='text-center sm:text-left' />
                                                </label>
                                                {/* Validity */}
                                                <label className="input input-bordered h-auto py-4 flex items-center gap-2 bg-transparent flex-col sm:flex-row">
                                                    <p className={`flex-shrink-0 font-semibold w-full text-center sm:text-left sm:w-[30%] border-b pb-2 sm:pb-0 sm:border-b-transparent sm:border-r ${theme === 'dark' ? 'border-white/20' : ''}`}> Validity: </p>
                                                    <input type="text" defaultValue={visa.validity} name="validity" placeholder="e.g. 10 years" className='text-center sm:text-left' />
                                                </label>
                                                {/* Application Method */}
                                                <label className="input input-bordered h-auto py-4 flex items-center gap-2 bg-transparent flex-col sm:flex-row">
                                                    <p className={`flex-shrink-0 font-semibold w-full text-center sm:text-left sm:w-[30%] border-b pb-2 sm:pb-0 sm:border-b-transparent sm:border-r ${theme === 'dark' ? 'border-white/20' : ''}`}> Application Method: </p>
                                                    <input type="text" name="applicationMethod" defaultValue={visa.applicationMethod} placeholder="e.g. Online" className='text-center sm:text-left' />
                                                </label>
                                            </div>

                                            <div className='flex flex-col md:flex-row items-center gap-3 mt-6'>
                                                <button className={`btn w-full md:w-2/3 font-bold ${theme === 'dark' ? 'bg-white text-[#171924] hover:bg-white/80' : 'bg-[#171924] text-white hover:bg-[#171924]/80'}`}> Update </button>
                                                <div className='w-full'>
                                                    <form method="dialog">
                                                        {/* if there is a button in form, it will close the modal */}
                                                        <button className="btn bg-[#f52549] text-white hover:bg-[#f52549]/80 w-full"> Cancel </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </dialog>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default MyAddedVisa;