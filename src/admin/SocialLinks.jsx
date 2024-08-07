import React, { useState } from "react";
import axios from "../axiosConfig";
import { toast } from "react-toastify";
import { FaFacebook, FaTwitterSquare, FaPinterest, FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";

const SocialLinks = () => {
    const [socialProfiles, setSocialProfiles] = useState({
        facebook: "",
        twitter: "",
        pinterest: "",
        linkedin: "",
        youtube: "",
        instagram: ""
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
            await axios.put("/store/updateStore", { socialProfiles }).then(
                (response) => {
                    toast.success(response.data.message);
                    setSocialProfiles({
                        facebook: "",
                        twitter: "",
                        pinterest: "",
                        linkedin: "",
                        youtube: "",
                        instagram: ""
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
                    instagram: ""
                });
            });
        } catch (error) {
            console.error("Error saving social profiles:", error);
        }
    };

    // Icon mapping for each social media platform
    const iconMap = {
        facebook: <FaFacebook className="w-6 h-6 text-white" />,
        twitter: <FaTwitterSquare className="w-6 h-6 text-white" />,
        pinterest: <FaPinterest className="w-6 h-6 text-white" />,
        linkedin: <FaLinkedin className="w-6 h-6 text-white" />,
        youtube: <FaYoutube className="w-6 h-6 text-white" />,
        instagram: <FaInstagram className="w-6 h-6 text-white" />
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">
                Social profiles help you to gain more trust. Consider adding your social
                profile links for better user interaction.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(socialProfiles).map((key) => (
                    <div key={key} className="flex items-center">
                        <div className="bg-gray-800 rounded-full p-2">
                            {iconMap[key]} {/* Display the corresponding icon */}
                        </div>
                        <div className="ml-4">
                            <label htmlFor={key} className="block text-gray-700 font-bold">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </label>
                            <input
                                type="text"
                                id={key}
                                value={socialProfiles[key]}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                placeholder="http://"
                            />
                        </div>
                    </div>
                ))}
            </div>
            <button
                type="button"
                onClick={handleSave}
                className="focus:outline-none text-white mt-6 bg-red-600 hover:bg-red-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
            >
                Save Link
            </button>
        </div>
    );
};

export default SocialLinks;
