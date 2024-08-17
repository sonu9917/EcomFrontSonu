import React, { useState } from "react";
import axios from "../axiosConfig";
import { toast } from "react-toastify";
import { FaFacebook, FaTwitterSquare, FaPinterest, FaLinkedin, FaYoutube, FaInstagram,FaFlickr } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsFillThreadsFill } from "react-icons/bs";

const SocialLinks = () => {
    const [socialProfiles, setSocialProfiles] = useState({
        facebook: "",
        twitter: "",
        pinterest: "",
        linkedin: "",
        youtube: "",
        instagram: "",
        flicker:"",
        threads:""
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setSocialProfiles((prevProfiles) => ({
            ...prevProfiles,
            [id]: value
        }));
    };

    console.log(socialProfiles);

    const handleSave = async () => {

        try {
            await axios.put("/store/updateSocialLinks", { socialProfiles }).then(
                (response) => {
                    console.log(response)
                    toast.success(response.data.message);
                    setSocialProfiles({
                        facebook: "",
                        twitter: "",
                        pinterest: "",
                        linkedin: "",
                        youtube: "",
                        instagram: "",
                        flicker:''
                    });
                }
            ).catch((err) => {
                toast.error(err.data.error);
                setSocialProfiles({
                    facebook: "",
                    twitter: "",
                    pinterest: "",
                    linkedin: "",
                    youtube: "",
                    instagram: "",
                    flicker:''
                });
            });
        } catch (error) {
            console.error("Error saving social profiles:", error);
        }
    };

    // Icon mapping for each social media platform
    const iconMap = {
        facebook: <FaFacebook className="w-4 h-6 text-white" />,
        twitter: <FaTwitterSquare className="w-4 h-6 text-white" />,
        pinterest: <FaPinterest className="w-4 h-6 text-white" />,
        linkedin: <FaLinkedin className="w-4 h-6 text-white" />,
        youtube: <FaYoutube className="w-4 h-6 text-white" />,
        instagram: <FaInstagram className="w-4 h-6 text-white" />,
        flicker: <FaFlickr className="w-4 h-6 text-white" />,
        threads:<BsFillThreadsFill className="w-4 h-6 text-white"/>
    };

    return (
        <div className="container mx-auto p-4">
            <div className='flex items-center gap-4 font-bold mb-4  border-b-[1px] pb-4'>
                <span className='text-[24px] pt-[13px] '>Social Profiles </span> <span className='text-[80%] pt-3'>→</span> <Link to={'/admin/visitStore'} className='text-[#F05025] pt-3 text-[19px] cursor-pointer'>Visit Store</Link>
            </div>

            <h2 className="text-2xl mb-4 text-[#888888] text-[16px]">
                Social profiles help you to gain more trust. Consider adding your social
                profile links for better user interaction.
            </h2>
            <div className="grid grid-cols-1 place-items-center gap-4">
                {Object.keys(socialProfiles).map((key) => (
                    <div key={key} className="flex items-center ">

                        <label htmlFor={key} className="block w-20 text-gray-700 font-bold">
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        <div className="ml-4 flex ">
                            <div className="bg-gray-800 rounded-sm  p-2 pt-4">
                                {iconMap[key]} {/* Display the corresponding icon */}
                            </div>
                            <input
                                type="text"
                                id={key}
                                value={socialProfiles[key]}
                                onChange={handleInputChange}
                                className="block  px-5 pt-4 pb-4 pe-5 rounded-sm w-[360px]  border-[#d1d5db] border"
                                placeholder="http://"
                            />
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleSave}
                    className="focus:outline-none  text-white mt-6 bg-orange-600   font-medium  text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900 lg:text-xl"
                >
                    Update Settings
                </button>
            </div>
        </div>
    );
};

export default SocialLinks;
