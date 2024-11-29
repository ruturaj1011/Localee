import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken"
import httpStatus from "http-status";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";


// user

const userRegister = async (req, res) => {

    const { name, email, password, phone, address} = req.body;

    try{

        const existingUser = await User.findOne({email});

        if (existingUser && existingUser.role === "user") {
            return res.status(httpStatus.FOUND).json({ message: "User already exists with this email." });
        }

        if (existingUser && existingUser.role === "vendor") {
            return res.status(httpStatus.FOUND).json({ message: "Email is already registered as a Vendor. Please use another email." });
        }

        const hashedPassword = await bcrypt.hash(password, 11);

        const newUser = new User( {

            name : name,
            email : email,
            phone : phone,
            password : hashedPassword,
            address : address,
            role : "user"
        });

        await newUser.save();

        res.status(httpStatus.CREATED).json({message : "User Registered Successfully!"});
    }
    catch(e){
        res.status(500).json({message : `Something went wrong! ${e}`});
    }
}


// vendor

const vendorRegister = async (req, res) => {

    const { name, email, password, phone, address, businessName} = req.body;

    try{

        const existingUser = await User.findOne({email});

        if (existingUser && existingUser.role === "vendor") {
            return res.status(httpStatus.FOUND).json({ message: "Vendor already exists with this email." });
        }

        if (existingUser && existingUser.role === "user") {
            return res.status(httpStatus.FOUND).json({ message: "Email is already registered as a user. Please log in as a user or use another email." });
        }

        const hashedPassword = await bcrypt.hash(password, 11);

        const newUser = new User( {

            name : name,
            email : email,
            phone : phone,
            password : hashedPassword,
            address : address,
            businessName : businessName,
            role : "vendor"
        });

        await newUser.save();

        res.status(httpStatus.CREATED).json({message : "User Registered Successfully!"});
    }
    catch(e){
        res.status(500).json({message : `Something went wrong! ${e}`});
    }
}

// Login user and vendor

const login = async ( req, res, role) => {

    const { email , password } = req.body;

    if(!email || !password){
        return res.status(400).json({ message : "Please Provide Valid Details"});
    }

    try{

        const user = await User.findOne({email, role});

        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message : "User Not Found"});
        }

        let isPassword = await bcrypt.compare(password, user.password);

        if(isPassword){

            const token = jwt.sign(
                { id: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );

            return res.status(httpStatus.OK).json({token : token});
        }
        else{
            return res.status(httpStatus.UNAUTHORIZED).json({message: "Invalid Username or Password!"});
        }
    }
    catch(e){
        return res.status(500).json({message : `Something went wrong! ${e}`});
    }
}

const userLogin = (req,res) => login(req, res, "user");
const vendorLogin = (req,res) => login(req, res, "vendor");

export { userLogin, userRegister, vendorLogin, vendorRegister};