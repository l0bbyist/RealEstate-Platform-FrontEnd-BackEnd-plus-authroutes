import React, { useState, useEffect } from 'react';
import { sendRequest } from '../../config/request';
import { useNavigate } from 'react-router-dom';
import Broker from '../../hero-img.png';
import ButtonSm from '../../components/ButtonSm';
import Modal from '../../components/Modal';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', email: '', phoneNo: '', role: '', nationalIdCID: '' });
    const [editable, setEditable] = useState(false);
    const [changesMade, setChangesMade] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem("token") || sessionStorage.getItem("token");

                if (!token) {
                    setError("No authentication token found");
                    navigate("/auth");
                    return;
                }

                console.log("Fetching user profile...");
                const response = await sendRequest({ 
                    method: "GET", 
                    route: "/auth/profile",
                    headers: { Authorization: `Bearer ${token}` } // Ensure token is included
                });

                console.log("API Response:", response);

                if (response?.user) {
                    setUser(response.user);
                    localStorage.setItem("user", JSON.stringify(response.user));
                } else {
                    setError("No user data found");
                }
            } catch (error) {
                console.error("Profile fetch error:", error);
                setError(`Failed to load profile: ${error.response?.data?.message || "Server error"}`);
            }
        };

        fetchUserProfile();
    }, [navigate, localStorage.getItem("token")]); // 👈 Fetches data when token changes

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
        setChangesMade(true);
    };

    const handleEditProfile = () => setEditable(true);
    const handleCancelEdit = () => {
        setEditable(false);
        setChangesMade(false);
    };

    const handleSaveProfile = async () => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            const response = await sendRequest({
                method: 'POST',
                route: '/auth/updateProfile',
                body: user,
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.success) {
                setEditable(false);
                setChangesMade(false);
                setShowModal(true);
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                setError("Failed to update profile");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("An error occurred while updating profile.");
        }
    };

    if (!user.name && !error) {
        return <p className="text-center text-gray-500">Loading profile...</p>;
    }

    return (
        <div className='w-full'>
            <div className='md:ml-20'>
                <h2 className="text-3xl text-gray-800 font-medium leading-9">User Profile</h2>
                <div className="w-36 h-1.5 bg-gradient-to-r from-primary to-black mb-5 mt-3"></div>
            </div>
            <div className='flex flex-row-reverse justify-end gap-20'>
                <div className='hidden lg:block m-5'> 
                    <img src={Broker} alt="Profile" />
                </div> 
                <div className="container md:ml-20 max-w-lg">
                    {error && <p className="text-red-500 text-sm mb-5">{error}</p>}
                    <div className="mb-4">
                        <label className="block mb-2">Name</label>
                        <input type="text" name="name" value={user.name} onChange={handleInputChange} disabled={!editable} className="w-full rounded-md p-3 border border-gray-300"/>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Email</label>
                        <input type="email" name="email" value={user.email} disabled className="w-full rounded-md p-3 border border-gray-300"/>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Phone Number</label>
                        <input type="text" name="phoneNo" value={user.phoneNo} onChange={handleInputChange} disabled={!editable} className="w-full rounded-md p-3 border border-gray-300"/>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Role</label>
                        <input type="text" name="role" value={user.role} disabled className="w-full rounded-md p-3 border border-gray-300"/>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">NIDA ID</label>
                        <input type="text" name="nationalIdCID" value={user.nationalIdCID || "Not Provided"} disabled className="w-full rounded-md p-3 border border-gray-300"/>
                    </div>
                    {editable ? (
                        <div className="mb-4">
                            <button onClick={handleCancelEdit} className="bg-gray-800 text-white rounded-tr-2xl mr-2 py-4 font-semibold px-6 hover:text-white text-sm">Cancel</button>
                            <button onClick={handleSaveProfile} disabled={!changesMade} className="text-gray-800 px-7 py-2 rounded-tr-2xl mr-2 font-semibold bg-primary hover:text-white text-sm">Save</button>
                        </div>
                    ) : (
                        <ButtonSm buttonText="Edit Profile" onClick={handleEditProfile} />
                    )}
                </div>
            </div>
            {showModal && <Modal message="Profile Updated Successfully" onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default Profile;
