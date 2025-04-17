import dotenv from 'dotenv';
dotenv.config();

import { User } from '../models/userModel.js';


// profileInfo
const profileInfo = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await User.findById(id).populate('bookings').populate('servicesOffered');

        if(!data) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// updateProfile
const updateProfile = async (req, res) => {

    const { id } = req.params;
    const { name, phone, email, city, state } = req.body;

    try {
        const updatedProfile = await User.findByIdAndUpdate(id, { name, phone, email, city, state }, { new: true, runValidators: true });

        // console.log(updatedProfile);
        res.status(200).json({ message: "Profile updated successfully", updatedProfile });
    }
    catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export { profileInfo, updateProfile };